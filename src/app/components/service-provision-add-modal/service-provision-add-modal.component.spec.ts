import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProvisionAddModalComponent } from './service-provision-add-modal.component';

describe('ServiceProvisionAddModalComponent', () => {
  let component: ServiceProvisionAddModalComponent;
  let fixture: ComponentFixture<ServiceProvisionAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProvisionAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProvisionAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
