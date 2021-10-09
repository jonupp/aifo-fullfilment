import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Weather } from 'src/interfaces/WeatherInterface';

@Injectable()
export class WeatherService {
  private url = 'https://goweather.herokuapp.com/weather/';

  async getWeather(city: string): Promise<Weather> {
    const data = await fetch(`${this.url}${city}`);
    return data.json().then((jsonData: any) => {
      return { city, temperature: jsonData.temperature, wind: jsonData.wind, description: jsonData.description };
    });
  }
}
