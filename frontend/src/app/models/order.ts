import { TransportType } from './transport-type';

export class Order {
  constructor(
    public title: string,
    public body: string,
    public createdAt: Date,
    public todoAt: Date,
    public finishAt: Date,
    public transportType: TransportType,
    public address: string
  ) {}
}

export function serializeOrder(order: Order, customerId: string): NetworkOrder {
  return {
    title: order.title,
    body: order.body,
    createdAt: order.createdAt.toISOString(),
    todoAt: order.todoAt.toISOString(),
    finishAt: order.finishAt.toISOString(),
    transportTypeId: order.transportType.id,
    address: order.address,
    customerId,
  };
}

export function deserializeOrder(
  order: NetworkOrder,
  transportTypes: TransportType[]
): Order {
  const transportType = transportTypes.find(
    t => t.id === order.transportTypeId
  );
  if (!transportType) {
    throw new TransportTypeNotFoundError(order.transportTypeId);
  }

  return new Order(
    order.title,
    order.body,
    new Date(order.createdAt),
    new Date(order.todoAt),
    new Date(order.finishAt),
    transportType,
    order.address
  );
}

export class TransportTypeNotFoundError extends Error {
  constructor(transportTypeId: string) {
    super(`Transport type with id ${transportTypeId} not found`);
    this.name = 'TransportTypeNotFoundError';
  }
}

export interface NetworkOrder {
  title: string;
  body: string;
  createdAt: string;
  todoAt: string;
  finishAt: string;
  transportTypeId: string;
  address: string;
  customerId: string;
}
