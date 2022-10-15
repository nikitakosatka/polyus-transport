export class Transport {
  constructor(
    public id: string,
    public status: TransportStatus,
    public busyIntervals: BusyInterval[]
  ) {}
}

enum TransportStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Working = 'WORKING',
}

export interface BusyInterval {
  from: Date;
  to: Date;
}

export type NetworkBusyInterval = [string, string];

function serializeBusyInterval(
  busyInterval: BusyInterval
): NetworkBusyInterval {
  return [busyInterval.from.toISOString(), busyInterval.to.toISOString()];
}

function deserializeBusyInterval(
  networkBusyInterval: NetworkBusyInterval
): BusyInterval {
  return {
    from: new Date(networkBusyInterval[0]),
    to: new Date(networkBusyInterval[1]),
  };
}

export interface NetworkTransport {
  id: string;
  status: TransportStatus;
  busyIntervals: NetworkBusyInterval[];
}

export function serializeTransport(transportType: Transport): NetworkTransport {
  return {
    id: transportType.id,
    status: transportType.status,
    busyIntervals: transportType.busyIntervals.map(i =>
      serializeBusyInterval(i)
    ),
  };
}

export function deserializeTransport(
  networkTransport: NetworkTransport
): Transport {
  return new Transport(
    networkTransport.id,
    networkTransport.status,
    networkTransport.busyIntervals.map(i => deserializeBusyInterval(i))
  );
}
