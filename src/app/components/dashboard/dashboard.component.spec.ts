import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';

import {DashboardComponent} from './dashboard.component';

import {WeatherService, WidgetService, FavouritesService} from '../../services';
import {APP_CONFIG} from '../../configs';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let widgetService: WidgetService;
  let favouritesService: FavouritesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: APP_CONFIG, useValue: { weatherAPIKey: 'API_KEY' } },
        WidgetService,
        WeatherService,
        FavouritesService,
        provideHttpClient()
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    widgetService = TestBed.inject(WidgetService);
    favouritesService = TestBed.inject(FavouritesService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter widgets by favourite criteria', () => {
    widgetService.widgets.set([ { favourite: false }, { favourite: true } ] as any);
    favouritesService.showFavourites.set(true);
    expect(component.widgets().length).toEqual(1);
    expect(component.widgets().map(({ favourite }) => favourite).every(Boolean)).toBeTruthy();
  });
});
