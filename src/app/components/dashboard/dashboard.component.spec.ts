import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';

import {DashboardComponent} from './dashboard.component';

import {WeatherService, WidgetService} from '../../services';
import {APP_CONFIG} from '../../configs';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let widgetService: WidgetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPIKey: 'API_KEY' } },
        WidgetService,
        WeatherService,
        provideHttpClient()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    widgetService = TestBed.inject(WidgetService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter widgets by favourite criteria', () => {
    widgetService.widgets.set([ { favourite: false }, { favourite: true } ] as any);
    component.showFavourites.set(true);
    expect(component.widgets().length).toEqual(1);
    expect(component.widgets().map(({ favourite }) => favourite).every(Boolean)).toBeTruthy();
  });
});
