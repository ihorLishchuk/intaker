import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';

import {WeatherWidgetComponent} from './weather-widget.component';
import {WeatherService, WidgetService} from '../../services';
import {APP_CONFIG} from '../../configs';

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;
  let widgetService: WidgetService;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetComponent],
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPI: 'https://api.com/', weatherAPIKey: 'API_KEY' } },
        WidgetService,
        WeatherService,
        provideHttpClient()
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    widgetService = TestBed.inject(WidgetService);
    weatherService = TestBed.inject(WeatherService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have widget and index properties', () => {
    expect(component.widget).toBeDefined();
    expect(component.index).toBeDefined();
  });

  describe('toggleFavourite: ', () => {
    it('should call a method of widget service', () => {
      const spyOnToggle = spyOn(widgetService, 'toggleFavourite');
      component.toggleFavourite(0);
      expect(spyOnToggle).toHaveBeenCalledWith(0);
    })
  })

  describe('removeWidget: ', () => {
    it('should call a method of widget service', () => {
      const spyOnRemove = spyOn(widgetService, 'removeWidget');
      component.removeWidget(0);
      expect(spyOnRemove).toHaveBeenCalledWith(0);
    })
  })

  describe('updateWidget: ', () => {
    it('should call a method of widget service each hour', fakeAsync(() => {
      const PERIOD = 500;
      weatherService.getCurrentWeatherByCity = () => of({} as any);
      weatherService.getNDaysForecast = () => of({} as any);
      widgetService.updateWidget = () => undefined;

      const spyOnUpdate = spyOn(widgetService, 'updateWidget');
      component.automaticUpdateExecution(PERIOD).subscribe();
      tick(PERIOD);
      tick(PERIOD);
      tick(PERIOD);
      expect(spyOnUpdate).toHaveBeenCalledTimes(3);
    }))
  })
})
