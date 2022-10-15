from backend.pkg.api.repository import transport


def create(application, db):
    transport.create(application, db)


def get_all(db):
    return transport.get_all(db)


def get(id, db):
    return transport.get(id, db)


def update(id, request, db):
    return transport.update(id, request, db)


def remove(id, db):
    return transport.remove(id, db)
