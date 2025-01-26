import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';

import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

import {WeatherWidgetBasicComponent} from './weather-widget-basic/weather-widget-basic.component';
import {WeatherWidgetForecastComponent} from './weather-widget-forecast/weather-widget-forecast.component';
import {CurrentWeatherConditionsEntity, Forecast} from '../../entities';
import {StorageService} from '../../services';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styles: [` mat-divider { margin: 1rem 0 } `],
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatButton,
    MatCardActions,
    MatCardHeader,
    WeatherWidgetBasicComponent,
    WeatherWidgetForecastComponent,
    MatDivider
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetComponent {
  readonly storageService = inject(StorageService);

  selectedCities = this.storageService.selectedCities;

  city = input<{
    currentWeatherConditions: CurrentWeatherConditionsEntity,
    forecast: Forecast
  } | undefined>();
  index = input<number>();

  removeWidget(index: number | undefined): void {
    this.selectedCities.update((currentCities) => {
      if (index) currentCities.splice(index, 1);
      return [...currentCities];
    });
  }
}
