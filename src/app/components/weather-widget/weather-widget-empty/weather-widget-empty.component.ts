import {ChangeDetectionStrategy, Component, inject, ViewContainerRef} from '@angular/core';

import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';

import {combineLatest, filter, switchMap, take, tap} from 'rxjs';

import {DialogSelectCityComponent} from '../../dialogs';
import {StorageService, WeatherService} from '../../../services';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  readonly snackBar = inject(MatSnackBar);

  selectedCities = this.storageService.cities;
  #hasDuplicates = (cityName: string): boolean => {
      return this.selectedCities().some(city => city.currentWeather.name === cityName);
  }

  #checkIfSnackBarRequired = (cityName: string): void => {
    if (this.#hasDuplicates(cityName)) {
      this.snackBar.open(`You already have a widget with the city: ${cityName}`, 'Close');
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
      tap(this.#checkIfSnackBarRequired),
      filter((cityName: string) => !this.#hasDuplicates(cityName)),
      switchMap((cityName: string) => combineLatest({
        currentWeather: this.#weatherService.getCurrentWeatherByCity(cityName),
        forecast: this.#weatherService.getNDaysForecast({ name: cityName }),
      })),
      tap((newCity) => this.selectedCities.update((currentCities) => [...currentCities, { ...newCity, favourite: false }])),
    ).subscribe();
  }
}
