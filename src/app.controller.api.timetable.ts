import { Body, Controller, Post } from '@nestjs/common';

@Controller('api')
export class TimetableController {
  @Post('timetable')
  timetableWebhook(@Body() requestBody: any) {
    const from = requestBody.queryResult.parameters.from;
    const to = requestBody.queryResult.parameters.to;
    const datetime = requestBody.queryResult.parameters.datetime;

    return {
      fulfillmentMessages: [
        {
          text: {
            text: [`I want to travel ${from} ${to} ${datetime}`],
          },
        },
      ],
    };
  }
}
