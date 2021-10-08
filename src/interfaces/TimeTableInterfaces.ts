export interface TimetableResult {
  connections: Connection[];
}

export interface Connection {
  duration: string;
  sections: Section[];
}

export interface Section {
  transportMean: TransportMean;
  transportIdentifier: string;
  departure: Node;
  arrival: Node;
}

export interface Node {
  name: string;
  platform: number;
  datetime: Date;
}

export enum TransportMean {
  Train, Bus, Walk
}
