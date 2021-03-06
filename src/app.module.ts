import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { TimetableController } from './app.controller.api.timetable';
import { TimetableService } from './services/app.services.timetable';
import { ConfigModule } from '@nestjs/config';
import { AttractionController } from './app.controller.api.attraction';
import { AttractionService } from './services/app.service.attraction';
import { JokeService } from './services/app.service.joke';
import { JokeController } from './app.controller.api.joke';
import { WeatherController } from './app.controller.api.weather';
import { WeatherService } from './services/app.service.weather';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AttractionController, TimetableController, JokeController, WeatherController],
  providers: [AppService, TimetableService, AttractionService, JokeService, WeatherService],
})
export class AppModule {}
