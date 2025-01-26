import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {CurrentWeatherConditionsEntity, Forecast} from '../entities';

@Injectable()
export class StorageService {
  UPDATE_IN_SECONDS = 5000;
  selectedCities: WritableSignal<{
    currentWeatherConditions: CurrentWeatherConditionsEntity,
    forecast: Forecast
  }[]> = signal(JSON.parse(localStorage.getItem('selectedCities') ?? '[]'));

  constructor() {
    effect(() => {
      localStorage.setItem('selectedCities', JSON.stringify(this.selectedCities()));
    });
  }
}
