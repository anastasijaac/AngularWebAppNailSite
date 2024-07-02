import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMitarbeiterComponent } from './navbar-mitarbeiter.component';

describe('NavbarMitarbeiterComponent', () => {
  let component: NavbarMitarbeiterComponent;
  let fixture: ComponentFixture<NavbarMitarbeiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMitarbeiterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMitarbeiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
