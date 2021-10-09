export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface Attraction {
  name: string;
  imageUrl: string | null;
  url: string | null;
}
