import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TimetableController } from './app.controller.api.timetable';
import { TimetableService } from './services/app.services.timetable';
import { ConfigModule } from '@nestjs/config';
import { AttractionController } from './app.controller.api.attraction';
import { AttractionService } from './services/app.service.attraction';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AttractionController, TimetableController],
  providers: [AppService, TimetableService, AttractionService],
})
export class AppModule {}
