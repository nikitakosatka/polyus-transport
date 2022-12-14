from uuid import uuid4

from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP, ENUM, ARRAY
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship

from backend.pkg.db import Base
from backend.pkg.schema import TransportStatus, OrderStatus, DriverStatus, \
    OrderRate


class Customer(Base):
    __tablename__ = 'customer'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    name = Column(String, nullable=False)
    orders = relationship('Order')
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Driver(Base):
    __tablename__ = 'driver'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    name = Column(String, nullable=False)
    transport_type_id = Column(UUID(as_uuid=True),
                               ForeignKey('transport_type.id'),
                               nullable=False)
    status = Column(ENUM(DriverStatus), nullable=False,
                    default=DriverStatus['available'])
    orders = relationship('Order')
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Dispatcher(Base):
    __tablename__ = 'dispatcher'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Order(Base):
    __tablename__ = 'order'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    title = Column(String, nullable=False)
    body = Column(String, nullable=True)
    rate = Column(ENUM(OrderRate), nullable=False, default=OrderRate['normal'])
    customer_id = Column(UUID(as_uuid=True),
                         ForeignKey('customer.id'),
                         nullable=False)
    driver_id = Column(UUID(as_uuid=True), ForeignKey('driver.id'),
                       nullable=True)
    created_at = Column(TIMESTAMP(timezone=False), nullable=False)
    todo_at = Column(TIMESTAMP(timezone=False), nullable=False)
    finish_at = Column(TIMESTAMP(timezone=False), nullable=False)
    transport_type_id = Column(UUID(as_uuid=True),
                               ForeignKey('transport_type.id'),
                               nullable=False)
    status = Column(ENUM(OrderStatus), nullable=False)
    address = Column(String, nullable=False)


class TransportType(Base):
    __tablename__ = 'transport_type'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    name = Column(String, nullable=False)
    transports = relationship('Transport', cascade='all, delete', lazy='joined')


class Transport(Base):
    __tablename__ = 'transport'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4,
                unique=True, nullable=False)
    status = Column(ENUM(TransportStatus), nullable=False)
    plate_number = Column(String, nullable=False)
    transport_type_id = Column(UUID(as_uuid=True),
                               ForeignKey('transport_type.id'),
                               nullable=False)
    busy_intervals = Column(ARRAY(TIMESTAMP(timezone=False), dimensions=2),
                            nullable=False, default=[])
