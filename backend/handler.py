import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

from mangum import Mangum  # noqa: E402

from app.asgi import application  # noqa: E402

handler = Mangum(application, lifespan='off')
