import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimetableController } from './app.controller.api.timetable';

@Module({
  imports: [],
  controllers: [AppController, TimetableController],
  providers: [AppService],
})
export class AppModule {}
