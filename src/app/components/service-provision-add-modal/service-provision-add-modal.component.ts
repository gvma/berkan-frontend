import { Contract } from 'src/app/models/contract.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ContractService } from 'src/app/services/contract.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-service-provision-add-modal',
  templateUrl: './service-provision-add-modal.component.html',
  styleUrls: ['./service-provision-add-modal.component.scss']
})
export class ServiceProvisionAddModalComponent implements OnInit {
  serviceProvisionForm: FormGroup;
  employees: Employee[] = []
  contracts: Contract[] = []
  submitted = false;
  loading = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<ServiceProvisionAddModalComponent>,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private employeeService: EmployeeService
  ) {
    this.employeeService.getEmployees().subscribe(
      response => {
        this.employees = response;
      }
    )
    this.contractService.getContracts().subscribe(
      response => {
        this.contracts = response;
      }
    )
  }

  ngOnInit(): void {
    this.serviceProvisionForm = this.formBuilder.group({
      employee: ['', Validators.required],
      contract: ['', Validators.required]
    });
  }

  get f() { return this.serviceProvisionForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.serviceProvisionForm.invalid) {
      return;
    }

    this.loading = true;
    this.contractService.associateEmployeeToContract(this.serviceProvisionForm.value).pipe(first())
      .subscribe(
        response => {
          this.dialogRef.close(response);
        },
        err => {
          this.error = err.error;
          this.loading = false;
        }
      )
  }

  closeModal(): void {
    this.dialogRef.close('CANCEL');
  }
}