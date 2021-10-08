import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './services/app.service';
import fetch from 'node-fetch';

async function getRedirectedResult(req) {
  return await (
    await fetch(req.protocol + '://' + req.get('host') + '/api/timetable', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook')
  async webhook(@Req() req) {
    switch (req.body.queryResult.intent.displayName) {
      case 'timetable.get': {
        return await getRedirectedResult(req);
      }
      case 'attractions.get': {
        return await getRedirectedResult(req);
      }
    }
  }
}
