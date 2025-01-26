import {ChangeDetectionStrategy, Component, output} from '@angular/core';

import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem
  ]
})
export class FavouritesComponent {
  toggleFavourites = output<boolean>();
}
