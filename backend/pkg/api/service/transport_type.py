from backend.pkg.api.repository import transport_type


def create(application, db):
    transport_type.create(application, db)


def get_all(db):
    return transport_type.get_all(db)


def get(id, db):
    return transport_type.get(id, db)


def update(id, request, db):
    return transport_type.update(id, request, db)


def remove(id, db):
    return transport_type.remove(id, db)


def is_available_transport(transport_type_id, date_start, date_end, db):
    if transport_type.get_available_transport(transport_type_id, date_start,
                                              date_end, db).first():
        return True

    return False
