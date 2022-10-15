from datetime import datetime
from enum import unique, Enum
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel, validator, Field


@unique
class TransportStatus(str, Enum):
    available = 'AVAILABLE'
    booked = 'BOOKED'
    working = 'WORKING'


@unique
class OrderStatus(str, Enum):
    todo = 'TODO'
    in_process = 'IN_PROCESS'
    done = 'DONE'


class Order(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    title: str
    body: str
    created_at: datetime
    todo_at: datetime
    finish_at: datetime
    transport_type_id: UUID
    status: str = Field(default='TODO')
    address: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
