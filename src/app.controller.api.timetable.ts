import { Body, Controller, Post } from '@nestjs/common';
import { TimetableService } from './app.services.timetable';

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
    const time = testDate
      .toLocaleTimeString('de-CH', { timeZone: 'Europe/Berlin' })
      .substr(0, 5);

    const result = await this.timetableService.getNextConnections(
      from,
      to,
      date,
      time,
    );

    let outputString = '';

    for (let i = 0; i < result.connections[0].sections.length; i++) {
      outputString += `In ${
        result.connections[0].sections[i].departure.name
      } go to platform ${result.connections[0].sections[i].departure.platform} 
    and use the ${
      result.connections[0].sections[i].train
    } departing on the ${result.connections[0].sections[i].departure.datetime
        .toISOString()
        .substr(0, 10)} at ${result.connections[0].sections[
        i
      ].departure.datetime
        .toLocaleTimeString('de-CH', { timeZone: 'Europe/Berlin' })
        .substr(0, 5)
        .substr(0, 5)}. \n`;
    }
    outputString += `The journey will take ${result.connections[0].duration.substr(
      3,
      8,
    )}h.`;

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
