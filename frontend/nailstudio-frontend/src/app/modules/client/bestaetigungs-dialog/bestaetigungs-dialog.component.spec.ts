import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestaetigungsDialogComponent } from './bestaetigungs-dialog.component';

describe('BestaetigungsDialogComponent', () => {
  let component: BestaetigungsDialogComponent;
  let fixture: ComponentFixture<BestaetigungsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestaetigungsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestaetigungsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
