import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsManagerComponent } from './movements-manager.component';

describe('MovementsManagerComponent', () => {
  let component: MovementsManagerComponent;
  let fixture: ComponentFixture<MovementsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
