from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from backend.pkg import models, schema
from backend.pkg.hashing import Hash


def create(request: schema.Customer, db: Session):
    new_user = models.Customer(
        id=request.id,
        name=request.name,
        email=request.email,
        password=Hash.bcrypt(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get(id: int, db: Session):
    user = db.query(models.Customer).filter(models.Customer.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with id {id} is not available")
    return user
