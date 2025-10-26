import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {DialogSelectCityComponent} from './dialog-select-city.component';

describe('DialogSelectCityComponent', () => {
  let fixture: ComponentFixture<DialogSelectCityComponent>;
  let component: DialogSelectCityComponent;
  let dialogRef: MatDialogRef<DialogSelectCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSelectCityComponent],
      providers: [
        {provide: MatDialogRef, useValue: { close: () => null }},
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DialogSelectCityComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('close: ', () => {
    it('should close the dialog', () => {
      const spyOnClose = spyOn(dialogRef, 'close');
      component.selectedCity = 'city';
      component.close();
      expect(spyOnClose).toHaveBeenCalledWith(component.selectedCity);
    });
  })
})
