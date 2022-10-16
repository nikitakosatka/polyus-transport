from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import order

router = APIRouter(prefix='/api/order', tags=['Order'])


@router.post('/create')
async def create(request: schema.Order, db: Session = Depends(get_db)):
    order.create(request, db)


@router.get('/all')
async def get_all(db: Session = Depends(get_db)):
    return order.get_all(db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    return order.get(id, db)


@router.put('/{id}')
async def update(id: UUID, request: schema.Order,
                 db: Session = Depends(get_db)):
    return order.update(id, request, db)


@router.delete('/{id}')
async def remove(id: UUID, db: Session = Depends(get_db)):
    return order.remove(id, db)


@router.get('/by_status/{status}/{transport_type_id}')
async def get_by_status(status: schema.OrderStatus,
                        transport_type_id: UUID,
                        db: Session = Depends(get_db)):
    return order.get_by_status(status, transport_type_id, db)


@router.get('/by_driver_id/{id}')
async def get_by_driver_id(id: UUID, db: Session = Depends(get_db)):
    return order.get_by_driver_id(id, db)
