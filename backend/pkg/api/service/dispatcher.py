from backend.pkg.api.repository import dispatcher


def create(request, db):
    return dispatcher.create(request, db)


def get(id, db):
    return dispatcher.get(id, db)
