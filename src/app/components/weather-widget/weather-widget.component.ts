import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {interval, switchMap, combineLatest, tap, of, Observable} from 'rxjs';

import {imports} from './weather-widget.imports';
import {WidgetEntity} from '../../entities';
import {WidgetService, WeatherService} from '../../services';
import {DEFAULT_WEATHER_UPDATE_SEQUENCE} from '../../consts';

@UntilDestroy()
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.scss',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetComponent {
  #widgetService = inject(WidgetService);
  #weatherService = inject(WeatherService);

  widget = input<WidgetEntity | undefined>();
  index = input<number>();

  toggleFavourite = (index: number | undefined): void => {
    this.#widgetService.toggleFavourite(index);
  }

  removeWidget = (index: number | undefined): void => {
    this.#widgetService.removeWidget(index);
  }

  #updateWidget = (updatedWidget: WidgetEntity): void => {
    this.#widgetService.updateWidget(updatedWidget);
  }

  automaticUpdateExecution = (time = DEFAULT_WEATHER_UPDATE_SEQUENCE): Observable<WidgetEntity> => {
    return interval(time)
      .pipe(
        switchMap(() => {
          const name = this.widget()?.currentWeather.name as string;
          return combineLatest({
            currentWeather: this.#weatherService.getCurrentWeatherByCity(name),
            forecast: this.#weatherService.getNDaysForecast({ name }),
            favourite: of(this.widget()?.favourite ?? false),
          })
        }),
        tap(this.#updateWidget),
        untilDestroyed(this)
      );
  }

  constructor() {
    this.automaticUpdateExecution().subscribe();
  }
}
