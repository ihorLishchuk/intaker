import environmentJson from '../../../public/config/environment.json';
import {InjectionToken} from '@angular/core';
export type AppConfig = typeof environmentJson;
export const APP_CONFIG = new InjectionToken<AppConfig>('Application configuration');
