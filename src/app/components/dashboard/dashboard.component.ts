import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';

import {imports} from './dashboard.imports';
import {WidgetService} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  #widgetService = inject(WidgetService);

  showFavourites = signal(false);
  widgets = computed(
    () => this.#widgetService.widgets().filter(({ favourite }) => this.showFavourites() ? favourite : true)
  );
}
