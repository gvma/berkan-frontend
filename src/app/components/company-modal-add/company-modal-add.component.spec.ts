import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyModalAddComponent } from './company-modal-add.component';

describe('CompanyModalAddComponent', () => {
  let component: CompanyModalAddComponent;
  let fixture: ComponentFixture<CompanyModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyModalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
