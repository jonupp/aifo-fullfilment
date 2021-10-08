import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TimetableController } from './app.controller.api.timetable';
import { TimetableService } from './services/app.services.timetable';

@Module({
  imports: [],
  controllers: [AppController, TimetableController],
  providers: [AppService, TimetableService],
})
export class AppModule {}
