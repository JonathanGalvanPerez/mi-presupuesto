import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditMovementComponent } from './form-edit-movement.component';

describe('FormEditMovementComponent', () => {
  let component: FormEditMovementComponent;
  let fixture: ComponentFixture<FormEditMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
