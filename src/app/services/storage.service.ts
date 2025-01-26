import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {WidgetEntity} from '../entities';

@Injectable()
export class StorageService {
  cities: WritableSignal<WidgetEntity[]> = signal(JSON.parse(localStorage.getItem('selectedCities') ?? '[]'));

  constructor() {
    effect(() => {
      localStorage.setItem('selectedCities', JSON.stringify(this.cities()));
    });
  }
}
