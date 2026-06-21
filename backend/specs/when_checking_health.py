from ninja.testing import TestClient

from app.api import api

client = TestClient(api)


class DescribeHealth:
    def should_return_ok_status(self) -> None:
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}
