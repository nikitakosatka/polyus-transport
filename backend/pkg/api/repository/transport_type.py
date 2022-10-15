from fastapi import HTTPException, status

from backend.pkg import models, schema


def create(item, db):
    transport_type = models.TransportType(id=item.id,
                                          name=item.name)

    db.add(transport_type)
    db.commit()


def get_all(db):
    return db.query(models.TransportType).all()


def get(id, db):
    transport_type = db.query(models.TransportType).filter(
        models.TransportType.id == id).first()
    if not transport_type:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport type with id {id} is not available")
    return transport_type


def update(id, request, db):
    transport_type = db.query(models.TransportType).filter(
        models.TransportType.id == id)

    if not transport_type.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport Type with id {id} not found")

    transport_type.update(request.dict())
    db.commit()
    return 'updated'


def remove(id, db):
    transport_type = db.query(models.TransportType).filter(
        models.TransportType.id == id)

    if not transport_type.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Transport Type with id {id} not found")

    transport_type.delete(synchronize_session=False)
    db.commit()

    return 'removed'


def get_available_transport(transport_type_id, date_start, date_end, db):
    return db.query(models.Transport).filter(
        models.Transport.transport_type_id == transport_type_id and all(
            not (interval[0] <= date_start <= interval[1]
                 or interval[0] <= date_end <= interval[1])
            for interval in models.Transport.busy_intervals))
