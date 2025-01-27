import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {APP_CONFIG} from '../configs';
import {DEFAULT_FORECAST} from '../consts';
import {CityEntity, CurrentWeatherEntity, ForecastEntity} from '../entities';

@Injectable()
export class WeatherService {
  #APIUrl = inject(APP_CONFIG)?.weatherAPI;
  #UNITS = inject(APP_CONFIG)?.units;
  #httpClient = inject(HttpClient);

  getCurrentWeatherByCity = (cityName: string): Observable<CurrentWeatherEntity> => {
    return this.#httpClient.get(`${this.#APIUrl}weather?q=${cityName}&units=${this.#UNITS}`) as Observable<CurrentWeatherEntity>;
  }

  getNDaysForecast = ({ name, cnt = DEFAULT_FORECAST }: Partial<CityEntity> & { cnt?: number }): Observable<ForecastEntity> => {
    return this.#httpClient.get(`${this.#APIUrl}forecast?q=${name}&cnt=${cnt}&units=${this.#UNITS}`) as Observable<ForecastEntity>;
  }
}
