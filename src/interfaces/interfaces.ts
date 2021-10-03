export interface TimetableResult {
  connections: Connection[];
}

export interface Connection {
  duration: string;
  sections: Section[];
}

export interface Section {
  train: string;
  departure: Node;
  arrival: Node;
}

export interface Node {
  name: string;
  platform: number;
  datetime: Date;
}
