import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  searchBarControl = new FormControl();
  @Output() valueChanged = this.searchBarControl.valueChanges;
}
