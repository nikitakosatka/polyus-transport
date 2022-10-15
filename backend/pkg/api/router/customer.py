from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import customer

router = APIRouter(prefix='/api/customer', tags=['Customer'])


@router.post('/create')
async def create(request: schema.Customer, db: Session = Depends(get_db)):
    customer.create(request, db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    return customer.get(id, db)
