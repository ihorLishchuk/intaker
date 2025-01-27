import {MatCard, MatCardContent} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';

import {WeatherWidgetComponent} from '../weather-widget/weather-widget.component';
import {WeatherWidgetEmptyComponent} from '../weather-widget/weather-widget-empty/weather-widget-empty.component';
import {FavouritesComponent} from '../favourites/favourites.component';

export const imports = [
  MatCard,
  MatCardContent,
  MatToolbar,
  WeatherWidgetComponent,
  WeatherWidgetEmptyComponent,
  FavouritesComponent,
];
