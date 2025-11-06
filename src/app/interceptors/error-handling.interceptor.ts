import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';

const UNAUTHORIZED_CODE = 401;

export function errorHandlingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error) => {
      if (error.status === UNAUTHORIZED_CODE) {
        // TODO: Replace it with real implementation
        snackBar.open(`Your session has been expired. The page will be refreshed`, 'Close');
        localStorage.removeItem('access_token');
        setTimeout(() => location.reload(), 3000);
        return throwError(() => error);
      }
      // TODO: App an adapter to handle specific error codes.
      snackBar.open(`Failed with the next message: ${error.error.message}`, 'Close');
      return throwError(() => error);
    })
  );
}
