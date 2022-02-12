import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalAddComponent } from './employee-modal-add.component';

describe('EmployeeModalAddComponent', () => {
  let component: EmployeeModalAddComponent;
  let fixture: ComponentFixture<EmployeeModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeModalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
