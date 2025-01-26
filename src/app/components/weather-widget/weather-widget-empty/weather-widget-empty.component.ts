import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';

import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';

import {combineLatest, filter, switchMap, take, tap} from 'rxjs';

import {DialogSelectCityComponent} from '../../dialogs';
import {StorageService, WeatherService} from '../../../services';

@Component({
  selector: 'app-empty-weather-widget',
  templateUrl: './weather-widget-empty.component.html',
  styleUrl: './weather-widget-empty.component.scss',
  imports: [
    MatButton,
    MatCard,
    MatCardContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherWidgetEmptyComponent {
  readonly #dialog = inject(MatDialog);
  readonly #viewContainerRef = inject(ViewContainerRef);
  readonly #weatherService = inject(WeatherService);
  readonly storageService = inject(StorageService);

  selectedCities = this.storageService.selectedCities;

  openDialog = (): void => {
    const dialogRef = this.#dialog.open(DialogSelectCityComponent, {
      width: '250px',
      viewContainerRef: this.#viewContainerRef
    });
    dialogRef.afterClosed().pipe(
      take(1),
      filter(Boolean),
      switchMap((cityName: string) => combineLatest({
        currentWeatherConditions: this.#weatherService.getCurrentWeatherConditionsByCity(cityName),
        forecast: this.#weatherService.getNDaysForecast({ name: cityName }),
      })),
      tap((newCity) => this.selectedCities.update((currentCities) => [...currentCities, newCity])),
    ).subscribe();
  }
}
