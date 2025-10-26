import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {imports} from './dialog-select-city.imports';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'dialog-select-city',
  templateUrl: './dialog-select-city.component.html',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSelectCityComponent {
  #dialogRef = inject(MatDialogRef<DialogSelectCityComponent>)
  #snackBar = inject(MatSnackBar);
  selectedCity = '';

  close = (): void => {
    if (!this.selectedCity) {
      this.#snackBar.open(`Please, enter a city name`, 'Close');
      return;
    }
    this.#dialogRef.close(this.selectedCity);
  }
}
