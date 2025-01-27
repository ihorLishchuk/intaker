import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {apiKeyInterceptor} from './api-key.interceptor';
import {APP_CONFIG} from '../configs';

describe('apiKeyInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPIKey: 'API_KEY' } },
        provideHttpClient(withInterceptors([apiKeyInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add api key to each url', () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Liverpool&units=metric';
    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(() => true);
    expect(req.request.params.get('APPID')).toEqual('API_KEY');
  });
});
