import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

import {SearchBarComponent} from '../../search-bar/search-bar.component';

export const imports = [
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatButton,
  MatDialogClose,
  SearchBarComponent,
  MatTooltip
]
