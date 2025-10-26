import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {imports} from './dashboard.imports';
import {WidgetService, FavouritesService} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  #widgetService = inject(WidgetService);
  #favouritesService = inject(FavouritesService);

  widgets = computed(
    () => this.#widgetService.widgets().filter(({ favourite }) => this.#favouritesService.showFavourites() ? favourite : true)
  );
}
