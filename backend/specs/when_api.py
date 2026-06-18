from django.test import Client as DjangoClient
from ninja.testing import TestClient

from app.api import api

client = TestClient(api)
django_client = DjangoClient()


class DescribeHealth:
    def should_return_ok_status(self) -> None:
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}


class DescribeAbout:
    def should_return_about_message(self, settings) -> None:
        settings.ABOUT_MESSAGE = "Template API v0.0.1 (development)"
        response = client.get("/about")
        assert response.status_code == 200
        assert response.json()["message"] == "Template API v0.0.1 (development)"

    def should_include_cors_header_for_allowed_origin(self, settings) -> None:
        settings.CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
        response = django_client.get("/about", HTTP_ORIGIN="http://localhost:3000")
        assert response["Access-Control-Allow-Origin"] == "http://localhost:3000"
