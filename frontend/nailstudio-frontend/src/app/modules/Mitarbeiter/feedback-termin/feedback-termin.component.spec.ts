import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTerminComponent } from './feedback-termin.component';

describe('FeedbackTerminComponent', () => {
  let component: FeedbackTerminComponent;
  let fixture: ComponentFixture<FeedbackTerminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackTerminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackTerminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
