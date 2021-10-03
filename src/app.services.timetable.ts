import { Injectable } from '@nestjs/common';
import { Connection, Section, TimetableResult } from './interfaces/interfaces';
import fetch from 'node-fetch';

@Injectable()
export class TimetableService {
  private url = 'http://transport.opendata.ch/v1/connections';

  async getNextConnections(
    from: string,
    to: string,
    date: string,
    time: string,
  ) {
    const response = await fetch(
      `${this.url}?from=${from}&to=${to}&date=${date}&time=${time}&limit=5`,
    );
    const data = await response.json();

    const timetableResult: TimetableResult = {
      connections: [],
    };

    for (let i = 0; i < data.connections.length; i++) {
      const connection: Connection = {
        duration: data.connections[i].duration,
        sections: [],
      };

      for (let z = 0; z < data.connections[i].sections.length; z++) {
        const section: Section = {
          train:
            data.connections[i].sections[z].journey.category +
            data.connections[i].sections[z].journey.number,
          departure: {
            name: data.connections[i].sections[z].departure.station.name,
            datetime: new Date(
              data.connections[i].sections[z].departure.departure,
            ),
            platform: data.connections[i].sections[z].departure.platform,
          },
          arrival: {
            name: data.connections[i].sections[z].arrival.station.name,
            datetime: new Date(data.connections[i].sections[z].arrival.arrival),
            platform: data.connections[i].sections[z].arrival.platform,
          },
        };
        connection.sections.push(section);
      }
      timetableResult.connections.push(connection);
    }
    return timetableResult;
  }
}
