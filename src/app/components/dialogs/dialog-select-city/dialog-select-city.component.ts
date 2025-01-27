import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {imports} from './dialog-select-city.imports';

@Component({
  selector: 'dialog-select-city',
  templateUrl: './dialog-select-city.component.html',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSelectCityComponent {
  #dialogRef = inject(MatDialogRef<DialogSelectCityComponent>)
  selectedCity = '';

  close = (): void => {
    this.#dialogRef.close(this.selectedCity);
  }
}
