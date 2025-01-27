import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {imports} from './weather-widget-basic.imports';
import {CurrentWeatherEntity} from '../../../entities';

@Component({
  selector: 'app-weather-widget-basic',
  templateUrl: './weather-widget-basic.component.html',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetBasicComponent {
  currentWeather = input<CurrentWeatherEntity | undefined>();
}
