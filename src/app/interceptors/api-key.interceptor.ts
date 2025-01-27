import {inject} from '@angular/core';
import {HttpEvent, HttpHandlerFn, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {APP_CONFIG} from '../../main';

export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const API_KEY: string = inject(APP_CONFIG)?.weatherAPIKey;
  const newReq = req.clone({
    params: (req.params ? req.params : new HttpParams())
      .set('APPID', API_KEY)
  });

  return next(newReq);
}
