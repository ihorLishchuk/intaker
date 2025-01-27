import {ChangeDetectionStrategy, Component, output} from '@angular/core';

import {imports} from './favourites.imports';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports
})
export class FavouritesComponent {
  toggleFavourites = output<boolean>();
}
