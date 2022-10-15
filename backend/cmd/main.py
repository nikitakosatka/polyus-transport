from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.pkg.db import engine
from backend.pkg.models import Base
from backend.pkg.api.router import authentication, order, transport_type, \
    transport, customer, driver

app = FastAPI()

origins = [
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(order.router)
app.include_router(transport_type.router)
app.include_router(transport.router)
app.include_router(customer.router)
app.include_router(driver.router)
