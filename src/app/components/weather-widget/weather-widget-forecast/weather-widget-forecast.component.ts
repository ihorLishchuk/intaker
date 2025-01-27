import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {imports} from './weather-widget-forecast.imports';
import {ForecastEntity} from '../../../entities';

@Component({
  selector: 'app-weather-widget-forecast',
  templateUrl: './weather-widget-forecast.component.html',
  styleUrl: './weather-widget-forecast.component.scss',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetForecastComponent {
  forecast = input<ForecastEntity | undefined>();
}
