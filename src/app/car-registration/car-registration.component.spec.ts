import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';

describe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  let fixture: ComponentFixture<CarRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
