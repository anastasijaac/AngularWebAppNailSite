import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentStatusComponent } from './appointment-status.component';

describe('AppointmentStatusComponent', () => {
  let component: AppointmentStatusComponent;
  let fixture: ComponentFixture<AppointmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
