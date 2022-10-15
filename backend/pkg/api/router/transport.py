from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import transport

router = APIRouter(prefix='/api/transport', tags=['Transport'])


@router.post('/create')
async def create(request: schema.Transport, db: Session = Depends(get_db)):
    transport.create(request, db)


@router.get('/all')
async def get_all(db: Session = Depends(get_db)):
    return transport.get_all(db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    return transport.get(id, db)


@router.put('/{id}')
async def update(id: UUID, request: schema.Transport,
                 db: Session = Depends(get_db)):
    return transport.update(id, request, db)


@router.delete('/{id}')
async def remove(id: UUID, db: Session = Depends(get_db)):
    return transport.remove(id, db)
