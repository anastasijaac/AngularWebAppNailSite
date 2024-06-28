import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarKundeComponent } from './navbar.kunde.component';

describe('NavbarKundeComponent', () => {
  let component: NavbarKundeComponent;
  let fixture: ComponentFixture<NavbarKundeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarKundeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarKundeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
