# TableWise

## Run locally

The frontend and backend run in separate terminals. The backend requires a running MongoDB instance.

### Configure the backend

Create `backend/.env` with your MongoDB connection details:

```env
MONGO_URL=mongodb://127.0.0.1:27017
DB_NAME=tablewise
EMERGENT_EMAIL_KEY=
EMAIL_FROM_NAME=TableWise
EMAIL_REPLY_TO=
LEAD_INBOX=
```

For MongoDB Atlas, use your Atlas connection string for `MONGO_URL` instead. Keep credentials private. To enable enquiry email notifications, set `EMERGENT_EMAIL_KEY` to a valid integration key and `EMAIL_FROM_NAME` to an approved sender name. `EMAIL_REPLY_TO` is optional. Set `LEAD_INBOX` to the address that should receive enquiry notifications; if omitted, the existing default recipient is used. Without a valid email key, enquiries can still be saved, but notification emails cannot be delivered. The form now reports separately whether an enquiry was saved and whether its email notification was sent.

In a terminal from the project root:

```powershell
Set-Location backend
python -m pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8000
```

### Configure and run the frontend

Create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

In a second terminal from the project root:

```powershell
Set-Location frontend
corepack yarn install --frozen-lockfile
corepack yarn start
```

Open [http://localhost:3000](http://localhost:3000). Restart the frontend after changing `.env` files; Create React App reads environment variables at startup.

The enquiry form sends requests to `http://localhost:8000/api/leads`. If it shows a send error, check that the backend and MongoDB are running and that both `.env` files are configured correctly. MongoDB is required to save enquiries; valid email credentials are required to deliver notifications.