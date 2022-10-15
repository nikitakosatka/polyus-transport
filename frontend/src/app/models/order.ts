export class Order {
  constructor(
    public title: string,
    public body: string,
    public createdAt: Date,
    public todoAt: Date,
    public finishAt: Date,
    public transportTypeId: string,
    public address: string
  ) {}
}

export function serializeOrder(order: Order): NetworkOrder {
  return {
    title: order.title,
    body: order.body,
    createdAt: order.createdAt.toISOString(),
    todoAt: order.todoAt.toISOString(),
    finishAt: order.finishAt.toISOString(),
    transportTypeId: order.transportTypeId,
    address: order.address,
  };
}

export function deserializeOrder(order: NetworkOrder): Order {
  return new Order(
    order.title,
    order.body,
    new Date(order.createdAt),
    new Date(order.todoAt),
    new Date(order.finishAt),
    order.transportTypeId,
    order.address
  );
}

export interface NetworkOrder {
  title: string;
  body: string;
  createdAt: string;
  todoAt: string;
  finishAt: string;
  transportTypeId: string;
  address: string;
}
