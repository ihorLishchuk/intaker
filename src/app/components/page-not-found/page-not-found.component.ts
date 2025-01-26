import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
