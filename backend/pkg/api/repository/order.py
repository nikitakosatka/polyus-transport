from fastapi import HTTPException, status

from backend.pkg import models, schema


def create(item, db):
    order = models.Order(id=item.id,
                         title=item.title,
                         body=item.body,
                         created_at=item.created_at,
                         todo_at=item.todo_at,
                         finish_at=item.finish_at,
                         transport_type_id=item.transport_type_id,
                         status=item.status)

    db.add(order)
    db.commit()


def get_all(db):
    return db.query(models.Order).all()


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

    order.update(request)
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


def get_by_status(status, db):
    return db.query(models.Order).filter(
        models.Order.status == schema.OrderStatus[status]).all()
