import {Routes} from '@angular/router';
import {DashboardComponent, PageNotFoundComponent} from './components';
import {StorageService, WeatherService} from './services';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // TODO: Add lazy loading.
  { path: 'dashboard', component: DashboardComponent, providers: [WeatherService, StorageService] },
  { path: '**', component: PageNotFoundComponent },
];
