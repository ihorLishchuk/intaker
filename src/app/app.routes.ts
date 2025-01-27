import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components';
import {WidgetService, WeatherService} from './services';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: async () => (await import('./components/dashboard/dashboard.routes')).DASHBOARD_ROUTES,
    providers: [WeatherService, WidgetService]
  },
  { path: '**', component: PageNotFoundComponent },
];
