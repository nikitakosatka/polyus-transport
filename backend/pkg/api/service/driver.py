from backend.pkg.api.repository import driver


def create(request, db):
    return driver.create(request, db)


def get(id, db):
    return driver.get(id, db)


def update(id, request, db):
    return driver.update(id, request, db)
