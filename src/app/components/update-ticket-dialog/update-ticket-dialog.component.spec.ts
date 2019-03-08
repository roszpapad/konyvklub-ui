import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketDialogComponent } from './update-ticket-dialog.component';

describe('UpdateTicketDialogComponent', () => {
  let component: UpdateTicketDialogComponent;
  let fixture: ComponentFixture<UpdateTicketDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTicketDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
