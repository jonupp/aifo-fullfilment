import { Body, Controller, Post } from '@nestjs/common';
import { TimetableService } from './services/app.services.timetable';
import { Section, TransportMean } from './interfaces/interfaces';

function getTrainString(section: Section): string {
  return `In ${section.departure.name} go to platform ${section.departure.platform}
   and use the ${section.transportIdentifier} departing on the ${section.departure.datetime
    .toISOString()
    .substr(0, 10)} at ${section.departure.datetime
    .toLocaleTimeString('de-CH', { timeZone: 'Europe/Berlin' })
    .substr(0, 5)
    .substr(0, 5)}. \n`;
}

function getBusString(section: Section): string {
  return `In ${section.departure.name} use the Bus ${
    section.transportIdentifier
  } departing on ${section.departure.datetime.toISOString().substr(0, 10)} at ${section.departure.datetime
    .toLocaleTimeString('de-CH', { timeZone: 'Europe/Berlin' })
    .substr(0, 5)
    .substr(0, 5)}. \n`;
}

function getWalkString(section: Section): string {
  return `There is no transport available from ${section.departure.name}. You will have to walk to ${section.arrival.name}. \n`;
}

@Controller('api')
export class TimetableController {
  constructor(private timetableService: TimetableService) {}

  @Post('timetable')
  async timetableWebhook(@Body() requestBody: any) {
    const from = requestBody.queryResult.parameters.from;
    const to = requestBody.queryResult.parameters.to;
    const datetime = requestBody.queryResult.parameters.datetime;

    const testDate = new Date(datetime.date_time);
    const date = testDate.toISOString().substr(0, 10);
    const time = testDate.toLocaleTimeString('de-CH', { timeZone: 'Europe/Berlin' }).substr(0, 5);

    const result = await this.timetableService.getNextConnections(from, to, date, time);

    let outputString = '';

    if (result === null) {
      outputString = 'Sorry, I was unable to find a connection.';
    } else {
      for (let i = 0; i < result.connections[0].sections.length; i++) {
        switch (result.connections[0].sections[i].transportMean) {
          case TransportMean.Walk: {
            outputString += getWalkString(result.connections[0].sections[i]);
            break;
          }
          case TransportMean.Bus: {
            outputString += getBusString(result.connections[0].sections[i]);
            break;
          }
          case TransportMean.Train: {
            outputString += getTrainString(result.connections[0].sections[i]);
            break;
          }
        }
      }
      outputString += `The journey will take ${result.connections[0].duration.substr(3, 8)}h.`;
    }

    return {
      fulfillmentMessages: [
        {
          text: {
            text: [outputString],
          },
        },
      ],
    };
  }
}
