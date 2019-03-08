import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOfferDialogComponent } from './update-offer-dialog.component';

describe('UpdateOfferDialogComponent', () => {
  let component: UpdateOfferDialogComponent;
  let fixture: ComponentFixture<UpdateOfferDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOfferDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOfferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
