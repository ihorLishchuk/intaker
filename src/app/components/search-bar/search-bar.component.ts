import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {imports} from './search-bar.imports';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  searchBarControl = new FormControl();
  @Output() valueChanged = this.searchBarControl.valueChanges;
}
