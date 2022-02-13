import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvisionListComponent } from './service-provision-list.component';

describe('ServiceProvisionListComponent', () => {
  let component: ServiceProvisionListComponent;
  let fixture: ComponentFixture<ServiceProvisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProvisionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProvisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
