import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {APP_CONFIG} from '../../main';
import {DEFAULT_FORECAST} from '../consts';
import {CityEntity, CurrentWeatherConditionsEntity, Forecast} from '../entities';

@Injectable()
export class WeatherService {
  #APIUrl = inject(APP_CONFIG)?.weatherAPI;
  #UNITS = inject(APP_CONFIG)?.units;
  #httpClient = inject(HttpClient);

  getCurrentWeatherConditionsByCity = (cityName: string): Observable<CurrentWeatherConditionsEntity> => {
    return this.#httpClient.get(`${this.#APIUrl}weather?q=${cityName}&units=${this.#UNITS}`) as Observable<CurrentWeatherConditionsEntity>;
  }

  getNDaysForecast = ({ name, cnt = DEFAULT_FORECAST }: Partial<CityEntity> & { cnt?: number }): Observable<Forecast> => {
    return this.#httpClient.get(`${this.#APIUrl}forecast?q=${name}&cnt=${cnt}&units=${this.#UNITS}`) as Observable<Forecast>;
  }
}
