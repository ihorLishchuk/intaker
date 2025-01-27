import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

import {MatSnackBar} from '@angular/material/snack-bar';

export function errorHandlingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error) => {
      // TODO: App an adapter to handle specific error codes.
      snackBar.open(`Failed with the next message: ${error.error.message}`, 'Close');
      return throwError(() => error)
    })
  );
}
