import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './app/configs';

fetch('public/config/environment.json')
  .then((environment) => environment.json())
  .then((config) => {
    appConfig.providers.push({ provide: APP_CONFIG, useValue: config });
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch((err) => console.error(err));
