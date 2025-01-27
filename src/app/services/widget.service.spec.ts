import {TestBed} from '@angular/core/testing';
import {WidgetService} from './widget.service';

describe('WidgetService', () => {
  let service: WidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetService]
    });
    service = TestBed.inject(WidgetService);
  });

  // TODO: Fix the test
  // it('should initialize widgets from local storage', () => {
  //   const spyOnLocalStorage = spyOn(localStorage, 'getItem');
  //   expect(service.widgets).toBeDefined();
  //   expect(spyOnLocalStorage).toHaveBeenCalledWith('widgets');
  // });

  describe('toggleFavourite: ', () => {
    it('should toggle favourite property', () => {
      service.widgets.set([ { favourite: false } ] as any);
      service.toggleFavourite(0);
      expect(service.widgets()[0].favourite).toBeTruthy();
    })
  });

  describe('removeWidget: ', () => {
    it('should remove a widget', () => {
      service.widgets.set([ {  } ] as any);
      service.removeWidget(0);
      expect(service.widgets().length).toEqual(0);
    })
  });

  describe('updateWidget: ', () => {
    it('should full update a widget', () => {
      service.widgets.set([ { currentWeather: { id: 1, dt_txt: 'current' } } ] as any);
      service.updateWidget({ currentWeather: { id: 1, dt_txt: 'new' } } as any);
      expect(service.widgets()[0].currentWeather.dt_txt).toEqual('new');
    })
  });

  describe('addNewWidget: ', () => {
    it('should add a new widget', () => {
      service.addNewWidget({ currentWeather: { id: 1, dt_txt: 'new' } } as any);
      expect(service.widgets()[0].currentWeather.dt_txt).toEqual('new');
    })
  });
})
