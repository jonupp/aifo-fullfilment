import { Body, Controller, Post } from '@nestjs/common';
import { AttractionService } from './services/app.service.attraction';
import { City } from './interfaces/AttractionInterfaces';

@Controller('api')
export class AttractionController {
  constructor(private attractionService: AttractionService) {}

  @Post('attraction')
  async getAttractions(@Body() requestBody) {
    const cityName = requestBody.queryResult.parameters.city;
    const number = requestBody.queryResult.parameters.number || 5;

    const cityData = await this.attractionService.getCityCoordinates(cityName);

    const attractions = await this.attractionService.getAttractions(cityData.lon, cityData.lat, number);

    if (attractions.length === 0) {
      return {
        fulfillmentMessages: [
          {
            text: {
              text: [`Sorry, I could not find any attractions in ${cityName}.`],
            },
          },
        ],
      };
    }

    const fulfillmentMessages = [];

    for (let i = 0; i < attractions.length; i++) {
      fulfillmentMessages.push({
        card: {
          title: attractions[i].name,
          imageUri: attractions[i].imageUrl,
        },
      });
    }

    return {
      fulfillmentMessages: [fulfillmentMessages],
    };
  }
}
