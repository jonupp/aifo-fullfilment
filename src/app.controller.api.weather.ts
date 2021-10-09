import { Body, Controller, Post } from '@nestjs/common';
import { Weather } from './interfaces/WeatherInterface';
import { WeatherService } from './services/app.service.weather';

@Controller('api')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post('weather')
  async getWeather(@Body() requestBody) {
    const city = requestBody.queryResult.parameters.city;

    return this.weatherService.getWeather(city).then((weather: Weather) => {
      console.log(weather);
      let fulfillmentText: string;

      if (!weather.temperature || !weather.description || !weather.wind) {
        fulfillmentText = 'Sorry, I could not find weather information about this city.';
      } else {
        fulfillmentText = `The weather in ${weather.city} is ${
          weather.temperature
        } and ${weather.description.toLocaleLowerCase()}. The wind speed is ${weather.wind}.`;
      }

      const fulfillmentMessages: any[] = [
        {
          text: {
            text: [fulfillmentText],
          },
        },
      ];

      return {
        fulfillmentMessages: fulfillmentMessages,
      };
    });
  }
}
