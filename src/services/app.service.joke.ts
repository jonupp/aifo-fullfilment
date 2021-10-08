import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class JokeService {
  private url = 'https://geek-jokes.sameerkumar.website/api?format=json';

  async getRandomJoke(): Promise<string> {
    const data = await fetch(`${this.url}`,);
    const jsonData = await data.json();

    return jsonData.joke;
  }
}
