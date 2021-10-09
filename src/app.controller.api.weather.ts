import { Body, Controller, Post } from '@nestjs/common';
import { Weather } from './interfaces/WeatherInterface';
import { WeatherService } from './services/app.service.weather';

@Controller('api')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post('weather')
  async getWeather(@Body() requestBody) {

    const city = requestBody.queryResult.parameters.city;

    return this.weatherService.getWeather(city).then((weather: Weather)=>{
      const fulfillmentMessages: any[] = [
        {
          text: {
            text: [`The weather in ${weather.city} is ${weather.temperature} and ${weather.description.toLocaleLowerCase()}. The wind speed is ${weather.wind}.`],
          },
        },
      ];

      return {
        fulfillmentMessages: fulfillmentMessages,
      };
    });
  }
}
