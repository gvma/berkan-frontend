import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyModalEditComponent } from './company-modal-edit.component';

describe('CompanyModalEditComponent', () => {
  let component: CompanyModalEditComponent;
  let fixture: ComponentFixture<CompanyModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyModalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
