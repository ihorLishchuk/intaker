import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {interval, switchMap, combineLatest, tap, of} from 'rxjs';

import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';

import {WeatherWidgetBasicComponent} from './weather-widget-basic/weather-widget-basic.component';
import {WeatherWidgetForecastComponent} from './weather-widget-forecast/weather-widget-forecast.component';
import {WidgetEntity} from '../../entities';
import {StorageService, WeatherService} from '../../services';
import {DEFAULT_WEATHER_UPDATE} from '../../consts';

@UntilDestroy()
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatButton,
    MatCardActions,
    MatCardHeader,
    WeatherWidgetBasicComponent,
    WeatherWidgetForecastComponent,
    MatDivider,
    MatIcon,
    MatIconButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetComponent {
  readonly #storageService = inject(StorageService);
  readonly #weatherService = inject(WeatherService);

  cities = this.#storageService.cities;

  city = input<WidgetEntity | undefined>();
  index = input<number>();

  toggleFavourite = (index: number | undefined): void => {
    this.cities.update((currentCities) => {
      if (index !== undefined && currentCities[index]) currentCities[index] = { ...currentCities[index], favourite: !currentCities[index].favourite }
      return [...currentCities];
    })
  }

  removeWidget = (index: number | undefined): void => {
    this.cities.update((currentCities) => {
      if (index !== undefined) currentCities.splice(index, 1);
      return [...currentCities];
    });
  }

  #updateCity = (updatedCity: WidgetEntity): void => {
    this.cities.update(cities => {
      const index = cities.findIndex(city => city.currentWeather.id === updatedCity.currentWeather.id);
      if (index !== -1) cities.splice(index, 1, updatedCity);
      return [...cities];
    })
  }

  constructor() {
    interval(DEFAULT_WEATHER_UPDATE)
      .pipe(
        switchMap(() => {
          const name = this.city()?.currentWeather.name as string;
          return combineLatest({
            currentWeather: this.#weatherService.getCurrentWeatherByCity(name),
            forecast: this.#weatherService.getNDaysForecast({ name }),
            favourite: of(this.city()?.favourite ?? false),
          })
        }),
        tap(this.#updateCity),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
