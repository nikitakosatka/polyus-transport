from fastapi import FastAPI

from backend.pkg.db import engine
from backend.pkg.models import Base
from backend.pkg.api.router import order, transport_type, authentication

app = FastAPI()

Base.metadata.create_all(engine)

app.include_router(order.router)
app.include_router(transport_type.router)
app.include_router(authentication.router)
