from fastapi import HTTPException, status

from backend.pkg import models, schema
from backend.pkg.api.repository.transport_type import get_available_transport


def create(item, db):
    order = models.Order(id=item.id,
                         title=item.title,
                         body=item.body,
                         created_at=item.created_at,
                         customer_id=item.customer_id,
                         todo_at=item.todo_at,
                         finish_at=item.finish_at,
                         transport_type_id=item.transport_type_id,
                         rate=item.rate,
                         status=item.status,
                         address=item.address)

    transport_by_type = get_available_transport(item.transport_type_id,
                                                item.todo_at, item.finish_at,
                                                db)
    transport_obj = transport_by_type.first()

    transport_request = schema.Transport(id=transport_obj.id,
                                         status=transport_obj.status,
                                         transport_type_id=transport_obj.transport_type_id,
                                         plate_number=transport_obj.plate_number,
                                         busy_intervals=transport_obj.busy_intervals
                                         )
    transport_request.busy_intervals.append([item.todo_at, item.finish_at])
    transport = db.query(models.Transport).filter(
        models.Transport.id == transport_obj.id)
    transport.update(transport_request.dict())

    db.add(order)
    db.commit()


def get_all(db):
    return db.query(models.Order).order_by(models.Order.rate.asc()).all()


def get(id, db):
    order = db.query(models.Order).filter(models.Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with id {id} is not available")
    return order


def update(id, request, db):
    order = db.query(models.Order).filter(models.Order.id == id)

    if not order.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with id {id} not found")

    order.update(request.dict())
    db.commit()
    return 'updated'


def remove(id, db):
    order = db.query(models.Order).filter(models.Order.id == id)

    if not order.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Order with id {id} not found")

    order.delete(synchronize_session=False)
    db.commit()

    return 'removed'


def get_by_status(status, transport_type_id, db):
    return db.query(models.Order).filter(
        models.Order.status == schema.OrderStatus[status]
        and models.Order.transport_type_id == transport_type_id).order_by(
        models.Order.rate.asc()).all()


def get_by_driver_id(id, db):
    return db.query(models.Order).filter(models.Order.driver_id == id).order_by(
        models.Order.rate.asc()).all()
