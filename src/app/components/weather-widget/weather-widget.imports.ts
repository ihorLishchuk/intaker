import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';

import {WeatherWidgetBasicComponent} from './weather-widget-basic/weather-widget-basic.component';
import {WeatherWidgetForecastComponent} from './weather-widget-forecast/weather-widget-forecast.component';

export const imports = [
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
];
