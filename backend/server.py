import asyncio
from contextlib import suppress
from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
import os
import logging
import httpx
from html import escape
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
LEAD_INBOX = os.environ.get("LEAD_INBOX", "innovexnow@gmail.com")

# One entry per collection: every field a route filters, sorts or dedupes on. Add the index in the same edit as the query.
INDEXES: dict[str, list[IndexModel]] = {
    "status_checks": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("timestamp", DESCENDING)], name="timestamp_desc"),
    ],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:  # one at a time so a bad spec skips only itself
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:  # never block boot on an index; the log line names what to fix
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class LeadCreate(BaseModel):
    restaurant_name: str
    owner_name: str
    email: str
    whatsapp_number: str
    location_count: str

class LeadResponse(BaseModel):
    message: str
    lead_id: str
    email_sent: bool

def _assert_safe_email(subject: str, html: str) -> None:
    lowered = f"{subject}\n{html}".lower()
    if any(tag in lowered for tag in ("<form", "<input", "<textarea", "<select")):
        raise ValueError("Email templates cannot contain form controls")
    if "javascript:" in lowered or "data:" in lowered:
        raise ValueError("Email template contains an unsafe URL")

async def send_lead_email(lead: dict) -> str | None:
    if not EMAIL_KEY or not EMAIL_FROM_NAME:
        logging.getLogger(__name__).warning("Email delivery is not configured")
        return None
    subject = "New TableWise restaurant enquiry"
    html = (f'<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
            f'<h2>New TableWise enquiry</h2>'
            f'<p><strong>Restaurant:</strong> {escape(lead["restaurant_name"])}</p>'
            f'<p><strong>Owner:</strong> {escape(lead["owner_name"])}</p>'
            f'<p><strong>Email:</strong> {escape(lead["email"])}</p>'
            f'<p><strong>WhatsApp:</strong> {escape(lead["whatsapp_number"])}</p>'
            f'<p><strong>Locations:</strong> {escape(lead["location_count"])}</p>'
            f'<p style="font-size:12px;color:#777">Sent by {escape(EMAIL_FROM_NAME)}.</p>'
            f'</td></tr></table>')
    _assert_safe_email(subject, html)
    payload = {"to": [LEAD_INBOX], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME, "contact_email": EMAIL_REPLY_TO}
    try:
        async with httpx.AsyncClient(timeout=30) as email_client:
            response = await email_client.post(f"{EMAIL_BASE_URL}/api/v1/email/send", headers={"X-Email-Key": EMAIL_KEY}, json=payload)
        response.raise_for_status()
        return response.json().get("id")
    except Exception as exc:
        logging.getLogger(__name__).warning("Lead email could not be delivered: %s", exc)
        return None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/leads", response_model=LeadResponse)
async def create_lead(input: LeadCreate):
    lead = input.model_dump()
    lead["id"] = str(uuid.uuid4())
    lead["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.leads.insert_one(lead)
    logging.getLogger(__name__).info("New TableWise lead received: %s", lead["email"])
    email_id = await send_lead_email(lead)
    return LeadResponse(message="Lead received", lead_id=lead["id"], email_sent=email_id is not None)

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(limit: int = Query(20, ge=1, le=100)):
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit).to_list(limit)

    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())  # background: a big index build must not block boot

@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()  # stop a build still running before its client closes
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()