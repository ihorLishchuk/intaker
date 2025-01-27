import {ChangeDetectionStrategy, Component, inject, ViewContainerRef, WritableSignal} from '@angular/core';
import {combineLatest, filter, of, switchMap, take, tap} from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {imports} from './weather-widget-empty.imports';
import {DialogSelectCityComponent} from '../../dialogs';
import {WidgetService, WeatherService} from '../../../services';
import {WidgetEntity} from '../../../entities';

@Component({
  selector: 'app-empty-weather-widget',
  templateUrl: './weather-widget-empty.component.html',
  styleUrl: './weather-widget-empty.component.scss',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetEmptyComponent {
  #dialog = inject(MatDialog);
  #viewContainerRef = inject(ViewContainerRef);
  #weatherService = inject(WeatherService);
  #widgetService = inject(WidgetService);
  #snackBar = inject(MatSnackBar);

  widgets: WritableSignal<WidgetEntity[]> = this.#widgetService.widgets;

  #checkWidgetUniqueness = (cityName: string): void => {
    if (this.#widgetService.hasDuplicates(cityName)) {
      this.#snackBar.open(`You already have a widget with the city: ${cityName}`, 'Close');
    }
  }

  openDialog = (): void => {
    const dialogRef = this.#dialog.open(DialogSelectCityComponent, {
      width: '250px',
      viewContainerRef: this.#viewContainerRef
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(Boolean),
      tap(this.#checkWidgetUniqueness),
      filter((cityName: string) => !this.#widgetService.hasDuplicates(cityName)),
      switchMap((cityName: string) => combineLatest({
        currentWeather: this.#weatherService.getCurrentWeatherByCity(cityName),
        forecast: this.#weatherService.getNDaysForecast({ name: cityName }),
        favourite: of(false)
      })),
      tap(this.#widgetService.addNewWidget),
    ).subscribe();
  }
}
