import {CurrentWeatherConditionsEntity} from './current-weather-conditions.entity';

// TODO: Split the entity to smaller parts.
export interface Forecast {
  "cod": string,
  "message": number,
  "cnt": number,
  "list": CurrentWeatherConditionsEntity[],
  "city": {
    "id": number,
    "name": string,
    "coord": {
      "lat": number,
      "lon": number
      },
    "country": string,
    "population": number,
    "timezone": number,
    "sunrise": number,
    "sunset": number
  }
}

