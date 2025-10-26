// import {fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
// import { Injector, runInInjectionContext } from '@angular/core';
// import { FavouritesService } from './favourites.service';
// import {LocalStorageMock} from '../shared/mocks';
//
// describe('FavouritesService', () => {
//   let service: FavouritesService;
//   let localStorageMock: LocalStorageMock;
//
//   beforeEach(() => {
//     localStorageMock = new LocalStorageMock();
//     Object.defineProperty(window, 'localStorage', {
//       value: localStorageMock,
//       writable: true,
//     });
//
//     TestBed.resetTestingModule();
//     TestBed.configureTestingModule({});
//     const injector = TestBed.inject(Injector);
//
//     runInInjectionContext(injector, () => {
//       service = new FavouritesService();
//     });
//   });
//
//   it('should save to localStorage when showFavourites changes', fakeAsync(() => {
//     service.toggleFavourites(true);
//     flush();
//     expect(localStorage.getItem('showFavourites')).toBe('true');
//
//     service.toggleFavourites(false);
//     flush();
//     expect(localStorage.getItem('showFavourites')).toBe('false');
//   }));
// });
