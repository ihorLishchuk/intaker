import {TestBed} from '@angular/core/testing';
import {HttpClient, provideHttpClient} from '@angular/common/http';

import {WeatherService} from './weather.service';
import {APP_CONFIG} from '../configs';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPI: 'https://api.com/', units: 'metrics' } },
        WeatherService,
        provideHttpClient(),
      ]
    });
    service = TestBed.inject(WeatherService);
    httpClient = TestBed.inject(HttpClient);
  });

  describe('getCurrentWeatherByCity: ', () => {
    it('should use get method', () => {
      const spyOnTheMethod = spyOn(httpClient, 'get');
      service.getCurrentWeatherByCity('London')?.subscribe();
      expect(spyOnTheMethod).toHaveBeenCalledWith('https://api.com/weather?q=London&units=metrics');
    });
  });

  describe('getNDaysForecast: ', () => {
    it('should use get method', () => {
      const spyOnTheMethod = spyOn(httpClient, 'get');
      service.getNDaysForecast({ name: 'London' })?.subscribe();
      expect(spyOnTheMethod).toHaveBeenCalledWith('https://api.com/forecast?q=London&cnt=5&units=metrics');
    });

    it('should call forecast for 10 days', () => {
      const spyOnTheMethod = spyOn(httpClient, 'get');
      service.getNDaysForecast({ name: 'London', cnt: 10 })?.subscribe();
      expect(spyOnTheMethod).toHaveBeenCalledWith('https://api.com/forecast?q=London&cnt=10&units=metrics');
    });
  });
})
