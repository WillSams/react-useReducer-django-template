from __future__ import annotations

from django.conf import settings
from django.http import HttpRequest
from ninja import NinjaAPI

api = NinjaAPI()


@api.get("/")
def health(request: HttpRequest) -> dict[str, str]:
    return {"status": "ok"}


@api.get("/about")
def about(request: HttpRequest) -> dict[str, str]:
    return {"message": settings.ABOUT_MESSAGE}
