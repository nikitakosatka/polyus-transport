import { TransportType } from './transport-type';

export class Transport {
  constructor(
    public id: string,
    public type: TransportType,
    public status: TransportStatus,
    public busyIntervals: BusyInterval[],
    public plateNumber: string
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
  transportTypeId: string;
  status: TransportStatus;
  busyIntervals: NetworkBusyInterval[];
  plateNumber: string;
}

export function serializeTransport(t: Transport): NetworkTransport {
  return {
    id: t.id,
    transportTypeId: t.type.id,
    status: t.status,
    busyIntervals: t.busyIntervals.map(i => serializeBusyInterval(i)),
    plateNumber: t.plateNumber,
  };
}

export function deserializeTransport(
  nt: NetworkTransport,
  transportTypes: TransportType[]
): Transport {
  return new Transport(
    nt.id,
    transportTypes.find(t => t.id === nt.transportTypeId)!,
    nt.status,
    nt.busyIntervals.map(i => deserializeBusyInterval(i)),
    nt.plateNumber
  );
}
