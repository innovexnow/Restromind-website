import os

import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")


def test_create_lead_returns_id_and_message():
    response = requests.post(
        f"{BASE_URL}/api/leads",
        json={
            "restaurant_name": "TEST_Backend Kitchen",
            "owner_name": "TEST_Owner",
            "email": "test_backend@example.com",
            "whatsapp_number": "+15550000002",
            "location_count": "1",
        },
        timeout=15,
    )
    assert response.status_code == 200
    payload = response.json()
    assert payload["message"] == "Lead received"
    assert isinstance(payload["lead_id"], str)
    assert payload["lead_id"]


def test_create_lead_rejects_missing_required_field():
    response = requests.post(
        f"{BASE_URL}/api/leads",
        json={"restaurant_name": "TEST_Incomplete"},
        timeout=15,
    )
    assert response.status_code == 422