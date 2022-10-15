from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import driver

router = APIRouter(prefix='/api/driver', tags=['Driver'])


@router.post('/create')
async def create(request: schema.Driver, db: Session = Depends(get_db)):
    driver.create(request, db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    driver.get(id, db)


@router.put('/{id}')
async def update(id: UUID, request: schema.Driver,
                 db: Session = Depends(get_db)):
    return driver.update(id, request, db)


@router.get('/all')
async def get_all(db: Session = Depends(get_db)):
    return driver.get_all(db)
