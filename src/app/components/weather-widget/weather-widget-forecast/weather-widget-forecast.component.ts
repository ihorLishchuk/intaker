import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {WeatherWidgetBasicComponent} from '../weather-widget-basic/weather-widget-basic.component';
import {ForecastEntity} from '../../../entities';

@Component({
  selector: 'app-weather-widget-forecast',
  templateUrl: './weather-widget-forecast.component.html',
  styleUrl: './weather-widget-forecast.component.scss',
  imports: [
    WeatherWidgetBasicComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetForecastComponent {
  forecast = input<ForecastEntity | undefined>();
}
