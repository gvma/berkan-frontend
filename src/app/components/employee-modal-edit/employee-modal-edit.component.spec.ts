import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalEditComponent } from './employee-modal-edit.component';

describe('EmployeeModalEditComponent', () => {
  let component: EmployeeModalEditComponent;
  let fixture: ComponentFixture<EmployeeModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeModalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
