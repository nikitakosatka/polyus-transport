from datetime import datetime
from enum import unique, Enum
from typing import Optional, List
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


@unique
class TransportStatus(str, Enum):
    available = 'AVAILABLE'
    booked = 'BOOKED'
    working = 'WORKING'


@unique
class OrderStatus(str, Enum):
    todo = 'todo'
    in_process = 'in_process'
    done = 'done'


@unique
class DriverStatus(str, Enum):
    available = 'AVAILABLE'
    working = 'WORKING'


@unique
class OrderRate(str, Enum):
    low = 'LOW'
    normal = 'NORMAL'
    high = 'HIGH'


class Order(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    body: str
    created_at: datetime
    customer_id: UUID
    rate: OrderRate
    todo_at: datetime
    finish_at: datetime
    transport_type_id: UUID
    status: str = Field(default='TODO')
    address: str


class Transport(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    status: TransportStatus
    transport_type_id: UUID
    plate_number: str
    busy_intervals: List[List[datetime]] = []


class TransportType(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    transports: List[Transport] = []


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


class Customer(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    orders: List[Order] = []
    email: str
    password: str


class Driver(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    orders: List[Order] = []
    status: DriverStatus
    email: str
    password: str
    transport_type_id: UUID


class Dispatcher(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    email: str
    password: str
