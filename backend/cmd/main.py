from fastapi import FastAPI

from backend.pkg.db import engine
from backend.pkg.models import Base
from backend.pkg.api.router import authentication, order, transport_type, \
    transport, customer

app = FastAPI()

Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(order.router)
app.include_router(transport_type.router)
app.include_router(transport.router)
app.include_router(customer.router)
