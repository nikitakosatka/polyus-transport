from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.pkg import models, schema
from backend.pkg.hashing import Hash


def create(request: schema.Driver, db: Session):
    new_user = models.Driver(
        id=request.id,
        name=request.name,
        status=request.status,
        email=request.email,
        transport_type_id=request.transport_type_id,
        password=Hash.bcrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def get(id: int, db: Session):
    user = db.query(models.Driver).filter(models.Driver.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Driver with id {id} is not available")
    return user


def update(id, request, db):
    driver = db.query(models.Driver).filter(models.Driver.id == id)

    if not driver.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Driver with id {id} not found")

    driver.update(request.dict())
    db.commit()
    return 'updated'


def get_all(db):
    return db.query(models.Driver).all()
