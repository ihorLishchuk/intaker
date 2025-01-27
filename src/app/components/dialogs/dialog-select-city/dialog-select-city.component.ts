import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

import {SearchBarComponent} from '../../search-bar/search-bar.component';

@Component({
  selector: 'dialog-select-city',
  templateUrl: './dialog-select-city.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    SearchBarComponent,
    MatTooltip
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogSelectCityComponent {
  #dialogRef = inject(MatDialogRef<DialogSelectCityComponent>)
  selectedCity = '';

  close = (): void => {
    this.#dialogRef.close(this.selectedCity);
  }
}
