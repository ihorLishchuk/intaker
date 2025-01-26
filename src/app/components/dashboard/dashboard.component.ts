import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {combineLatest, interval, switchMap, tap, withLatestFrom} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import {MatCard, MatCardContent} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';

import {StorageService, WeatherService} from '../../services';
import {WeatherWidgetComponent} from '../weather-widget/weather-widget.component';
import {WeatherWidgetEmptyComponent} from '../weather-widget/weather-widget-empty/weather-widget-empty.component';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    MatToolbar,
    WeatherWidgetComponent,
    WeatherWidgetEmptyComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly #storageService = inject(StorageService);
  readonly #weatherService = inject(WeatherService);

  selectedCities = this.#storageService.selectedCities;
  selectedCityName = this.selectedCities().map(({currentWeatherConditions}) => currentWeatherConditions.name);

  #updateAllWidgetsInAPeriod = (): void => {
    // interval(this.#storageService.UPDATE_IN_SECONDS).pipe(
    //   switchMap(() => combineLatest(this.selectedCityName.map(cityName => ({
    //     currentWeatherConditions: this.#weatherService.getCurrentWeatherConditionsByCity(cityName),
    //     forecast: this.#weatherService.getNDaysForecast({ name: cityName }),
    //   })))),
    //   tap(console.log),
    //   // tap((newCity) => this.selectedCities.update((currentCities) => [...currentCities, newCity])),
    //   untilDestroyed(this)
    // ).subscribe()
  }

  constructor() {
    this.#updateAllWidgetsInAPeriod();
  }
}
