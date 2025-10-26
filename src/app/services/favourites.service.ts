import {effect, Injectable, signal} from '@angular/core';

@Injectable({ providedIn: 'any' })
export class FavouritesService {
  showFavourites = signal(JSON.parse(localStorage.getItem('showFavourites') ?? 'false'));

  toggleFavourites = (value: boolean): void => {
    this.showFavourites.set(value);
  }

  constructor() {
    effect(() => {
      localStorage.setItem('showFavourites', JSON.stringify(this.showFavourites()));
    });
  }
}
