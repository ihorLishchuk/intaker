import {Routes} from '@angular/router';
import {DashboardComponent, PageNotFoundComponent} from './components';
import {WidgetService, WeatherService} from './services';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // TODO: Add lazy loading.
  { path: 'dashboard', component: DashboardComponent, providers: [WeatherService, WidgetService] },
  { path: '**', component: PageNotFoundComponent },
];
