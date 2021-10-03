import { Body, Controller, Post } from '@nestjs/common';

@Controller('api')
export class TimetableController {
  @Post('timetable')
  timetableWebhook(@Body() requestBody: any) {
    return requestBody;
  }
}
