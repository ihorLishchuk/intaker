import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {imports} from './favourites.imports';
import {FavouritesService} from '../../services';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports
})
export class FavouritesComponent {
  #favouritesService = inject(FavouritesService);

  toggleFavourites = this.#favouritesService.toggleFavourites;
}
