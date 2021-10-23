import { Controller, Post } from '@nestjs/common';
import { JokeService } from './services/app.service.joke';

@Controller('api')
export class JokeController {
  constructor(private jokeService: JokeService) {}

  @Post('joke')
  async getJoke() {
    const joke = await this.jokeService.getRandomJoke();

    const fulfillmentMessages: any[] = [
      {
        text: {
          text: [joke],
        },
      },
    ];

    return {
      fulfillmentMessages: fulfillmentMessages,
    };
  }
}
