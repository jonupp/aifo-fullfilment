import { Body, Controller, Post } from '@nestjs/common';
import { AttractionService } from './services/app.service.attraction';

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

    const fulfillmentMessages: any[] = [
      {
        text: {
          text: [
            `I found the following ${
              attractions.length == 1 ? 'attraction' : attractions.length + 'attractions'
            } in ${cityName}:`,
          ],
        },
      },
    ];

    for (let i = 0; i < attractions.length; i++) {
      fulfillmentMessages.push({
        card: {
          title: attractions[i].name,
          imageUri: attractions[i].imageUrl,
          buttons: [
            {
              text: 'Visit website',
              postback: attractions[i].url,
            },
          ],
        },
      });
    }

    for (let i = 0; i < attractions.length; i++) {
      fulfillmentMessages.push({
        payload: {
          richContent: [
            [
              {
                type: 'image',
                rawUrl: attractions[i].imageUrl,
                accessibilityText: attractions[i].name,
              },
              {
                type: 'info',
                title: attractions[i].name,
                actionLink: attractions[i].url,
              },
            ],
          ],
        },
      });
    }

    return {
      fulfillmentMessages: fulfillmentMessages,
    };
  }
}
