export class TransportType {
  constructor(public id: string, public name: string) {}
}

export interface NetworkTransportType {
  id: string;
  name: string;
}

export function serializeTransportType(
  transportType: TransportType
): NetworkTransportType {
  return { id: transportType.id, name: transportType.name };
}

export function deserializeTransportType(
  networkTransportType: NetworkTransportType
): TransportType {
  return new TransportType(networkTransportType.id, networkTransportType.name);
}
