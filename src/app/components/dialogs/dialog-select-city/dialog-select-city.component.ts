import {ChangeDetectionStrategy, Component} from '@angular/core';

import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
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
  selectedCity = '';
}
