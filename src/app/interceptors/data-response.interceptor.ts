import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const dataResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map(event => {
      if (!(event instanceof HttpResponse)) return event;

      const rt = req.responseType ?? 'json';
      if (rt !== 'json') return event;

      const body = event.body;

      if (body && typeof body === 'object' && 'data' in body) {
        return event.clone({ body: (body as any).data });
      }

      return event;
    })
  );
};
