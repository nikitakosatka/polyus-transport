from backend.pkg.api.repository import order


def create(item, db):
    order.create(item, db)


def get_all(db):
    return order.get_all(db)


def get(id, db):
    return order.get(id, db)


def update(id, request, db):
    return order.update(id, request, db)


def remove(id, db):
    return order.remove(id, db)


def get_by_status(status, transport_type_id, db):
    return order.get_by_status(status, transport_type_id, db)
