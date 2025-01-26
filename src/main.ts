import { InjectionToken } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// TODO: This is must be in a separate file
import environmentJson from '../public/config/environment.json';
export type AppConfig = typeof environmentJson;
export const APP_CONFIG = new InjectionToken<AppConfig>('Application configuration');
// TODO: This is must be in a separate file

fetch('public/config/environment.json')
  .then((environment) => environment.json())
  .then((config) => {
    appConfig.providers.push({ provide: APP_CONFIG, useValue: config });
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch((err) => console.error(err));
