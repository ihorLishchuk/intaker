import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {MatSnackBar} from '@angular/material/snack-bar';

import {errorHandlingInterceptor} from './error-handling.interceptor';
import {APP_CONFIG} from '../configs';

describe('errorHandlingInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPIKey: 'API_KEY' } },
        provideHttpClient(withInterceptors([errorHandlingInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call snack bar on any error interceptions', (done) => {
    const snackBar = TestBed.inject(MatSnackBar);
    const spyOnSnackBar = spyOn(snackBar, 'open');
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=BlaBlaBla&units=metric';
    const mockErrorResponse = { message: 'failed' };
    httpClient.get(url).subscribe({
      error: () => done(),
    });

    const req = httpTestingController.expectOne(() => true);
    req.flush({ message: mockErrorResponse.message }, { status: 400, statusText: '' });
    expect(spyOnSnackBar).toHaveBeenCalledWith(`Failed with the next message: ${mockErrorResponse.message}`, 'Close');
  });
});
