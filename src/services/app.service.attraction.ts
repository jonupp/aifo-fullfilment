import { Injectable } from '@nestjs/common';
import { Attraction, City } from '../interfaces/AttractionInterfaces';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class AttractionService {
  constructor(private configService: ConfigService) {}

  private url = 'https://api.opentripmap.com/0.1';

  async getCityCoordinates(name: string): Promise<City> {
    const data = await fetch(
      `${this.url}/en/places/geoname?apikey=${this.configService.get('attractapikey')}&lang=${'en'}&name=${name}`,
    );
    const jsonData = await data.json();

    return {
      name: jsonData.name,
      lon: jsonData.lon,
      lat: jsonData.lat,
    };
  }
  async getAttractions(lon: number, lat: number, limit: number): Promise<Attraction[]> {
    const limitedData = await fetch(
      `${this.url}/en/places/radius?apikey=${this.configService.get(
        'attractapikey',
      )}&lang=${'en'}&radius=${1000}&lon=${lon}&lat=${lat}&rate=${'3'}&limit=${limit}&format=${'json'}&kinds=${'museums,fortifications,monuments_and_memorials,glaciers,historic_architecture'}`,
    );
    const jsonLimitedData = await limitedData.json();
    const attractions: Attraction[] = [];

    for (let i = 0; i < jsonLimitedData.length; i++) {
      const attractionDetailsData = await fetch(
        `${this.url}/en/places/xid/${jsonLimitedData[i].xid}?apikey=${this.configService.get('attractapikey')}`,
      );

      const attractionDetailsDataJson = await attractionDetailsData.json();

      const newAttraction: Attraction = {
        name: jsonLimitedData[i].name,
        imageUrl: attractionDetailsDataJson?.preview?.source,
        url: attractionDetailsDataJson?.wikpedia ?? attractionDetailsDataJson?.url,
      };

      attractions.push(newAttraction);
    }
    return attractions;
  }
}
