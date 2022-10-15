from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from backend.pkg import db, models, token
from backend.pkg.hashing import Hash

router = APIRouter(prefix='/api/auth', tags=['Authentication'])


@router.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends(),
          db: Session = Depends(db.get_db)):
    customer = db.query(models.Customer).filter(
        models.Customer.email == request.username).first()
    if not customer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Invalid Credentials")
    if not Hash.verify(customer.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Incorrect password")

    access_token = token.create_access_token(data={"sub": customer.email})

    return {"access_token": access_token, "token_type": "bearer"}
