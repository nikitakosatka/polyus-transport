from fastapi import HTTPException, status

from backend.pkg import models


def create(item, db):
    transport = models.Transport(id=item.id,
                                 status=item.status,
                                 transport_type_id=item.transport_type_id)

    db.add(transport)
    db.commit()


def get_all(db):
    return db.query(models.Transport).all()


def get(id, db):
    transport = db.query(models.Transport).filter(
        models.Transport.id == id).first()
    if not transport:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport with id {id} is not available")
    return transport


def update(id, request, db):
    transport = db.query(models.Transport).filter(
        models.Transport.id == id)

    if not transport.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport with id {id} not found")

    transport.update(request.dict())
    db.commit()
    return 'updated'


def remove(id, db):
    transport = db.query(models.Transport).filter(
        models.Transport.id == id)

    if not transport.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport with id {id} not found")

    transport.delete(synchronize_session=False)
    db.commit()

    return 'removed'
