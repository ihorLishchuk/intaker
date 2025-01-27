import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';

import {MatDialog} from '@angular/material/dialog';

import {WeatherWidgetEmptyComponent} from './weather-widget-empty.component';
import {WeatherService, WidgetService} from '../../../services';
import {APP_CONFIG} from '../../../configs';

describe('WeatherWidgetEmptyComponent', () => {
  let component: WeatherWidgetEmptyComponent;
  let fixture: ComponentFixture<WeatherWidgetEmptyComponent>;
  let dialogRef: MatDialog;
  let weatherService: WeatherService;
  let widgetService: WidgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetEmptyComponent],
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPI: 'https://api.com/', weatherAPIKey: 'API_KEY' } },
        WeatherService,
        WidgetService,
        provideHttpClient(),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WeatherWidgetEmptyComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialog);
    weatherService = TestBed.inject(WeatherService);
    widgetService = TestBed.inject(WidgetService);
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to open a dialog', () => {
    const action = false;
    const spyOnDialog = spyOn(dialogRef, 'open').and.returnValue({
      afterClosed: () => of(action)
    } as any);
    component.openDialog();
    expect(spyOnDialog).toHaveBeenCalled();
  })

  it('should not update widget if cancel was clicked', () => {
    const cityName = '';
    const spyOnWidgetUpdate = spyOn(component.widgets, 'update');
    const spyOnDialog = spyOn(dialogRef, 'open').and.returnValue({
      afterClosed: () => of(cityName)
    } as any);
    component.openDialog();
    expect(spyOnDialog).toHaveBeenCalled();
    expect(spyOnWidgetUpdate).not.toHaveBeenCalled();
  });

  it('should update widget if city is valid', () => {
    weatherService.getCurrentWeatherByCity = () => of({} as any);
    weatherService.getNDaysForecast = () => of({} as any);
    const cityName = 'London';
    const spyOnWidgetUpdate = spyOn(widgetService, 'addNewWidget');
    const spyOnDialog = spyOn(dialogRef, 'open').and.returnValue({
      afterClosed: () => of(cityName)
    } as any);
    component.openDialog();
    expect(spyOnDialog).toHaveBeenCalled();
    expect(spyOnWidgetUpdate).toHaveBeenCalled();
  });
})
