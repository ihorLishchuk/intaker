import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {MatCard, MatCardContent} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';

import {WeatherWidgetComponent} from '../weather-widget/weather-widget.component';
import {WeatherWidgetEmptyComponent} from '../weather-widget/weather-widget-empty/weather-widget-empty.component';
import {FavouritesComponent} from '../favourites/favourites.component';

import {WidgetService} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCard,
    MatCardContent,
    MatToolbar,
    WeatherWidgetComponent,
    WeatherWidgetEmptyComponent,
    FavouritesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  #widgetService = inject(WidgetService);

  showFavourites = signal(false);
  widgets = computed(
    () => this.#widgetService.widgets().filter(({ favourite }) => this.showFavourites() ? favourite : true)
  );
}
