from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.pkg import schema
from backend.pkg.db import get_db
from backend.pkg.api.service import dispatcher

router = APIRouter(prefix='/api/dispatcher', tags=['Dispatcher'])


@router.post('/create')
async def create(request: schema.Dispatcher, db: Session = Depends(get_db)):
    dispatcher.create(request, db)


@router.get('/{id}')
async def get(id: UUID, db: Session = Depends(get_db)):
    return dispatcher.get(id, db)
