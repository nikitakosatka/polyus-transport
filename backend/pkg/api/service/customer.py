from backend.pkg.api.repository import customer


def create(request, db):
    return customer.create(request, db)


def get(id, db):
    return customer.get(id, db)
