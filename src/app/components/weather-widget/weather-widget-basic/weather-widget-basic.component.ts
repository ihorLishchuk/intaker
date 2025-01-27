import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';

import {CurrentWeatherEntity} from '../../../entities';

@Component({
  selector: 'app-weather-widget-basic',
  templateUrl: './weather-widget-basic.component.html',
  imports: [
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetBasicComponent {
  currentWeather = input<CurrentWeatherEntity | undefined>();
}
