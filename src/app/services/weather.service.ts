import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { DEFAULT_FORECAST } from '../consts';
import { CityEntity, CurrentWeatherEntity, ForecastEntity } from '../entities';

@Injectable()
export class WeatherService {
  #http = inject(HttpClient);
  #base = environment.apiBase;

  getCurrentWeatherByCity(cityName: string): Observable<CurrentWeatherEntity> {
    return this.#http.get(
      `${this.#base}/v1/weather?city=${encodeURIComponent(cityName)}`
    ) as Observable<CurrentWeatherEntity>;
  }

  getNDaysForecast(
    { name, cnt = DEFAULT_FORECAST }: Partial<CityEntity> & { cnt?: number }
  ): Observable<ForecastEntity> {
    return this.#http.get(
      `${this.#base}/v1/weather/forecast?city=${encodeURIComponent(name!)}&cnt=${cnt}`
    ) as Observable<ForecastEntity>;
  }
}
