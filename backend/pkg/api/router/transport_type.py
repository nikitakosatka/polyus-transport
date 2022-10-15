from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import transport_type

router = APIRouter(prefix='/api/transport_type', tags=['Transport Type'])


@router.post('/create')
async def create(request: schema.TransportType, db: Session = Depends(get_db)):
    transport_type.create(request, db)


@router.get('/all')
async def get_all(db: Session = Depends(get_db)):
    return transport_type.get_all(db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    return transport_type.get(id, db)


@router.put('/{id}')
async def update(id: UUID, request: schema.Order,
                 db: Session = Depends(get_db)):
    return transport_type.update(id, request, db)


@router.delete('/{id}')
async def remove(id: UUID, db: Session = Depends(get_db)):
    return transport_type.remove(id, db)


@router.get('/is_available/{id}')
async def is_available(id: UUID, date_start: datetime, date_end: datetime,
                       db: Session = Depends(get_db)):
    return transport_type.is_available_transport(id, date_start, date_end, db)
