import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedTicketComponent } from './checked-ticket.component';

describe('CheckedTicketComponent', () => {
  let component: CheckedTicketComponent;
  let fixture: ComponentFixture<CheckedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
