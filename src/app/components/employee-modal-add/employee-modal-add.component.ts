import { CompanyService } from './../../services/company.service';
import { Company } from './../../models/company.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-employee-modal-add',
  templateUrl: './employee-modal-add.component.html',
  styleUrls: ['./employee-modal-add.component.scss'],
})
export class EmployeeModalAddComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  loading = false;
  companies: Company[] = []

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalAddComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService
  ) {
    this.companyService.getCompanies().subscribe(
      response => {
        this.companies = response
      }
    )
  }

  ngOnInit(): void {

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      admissionDate: ['', Validators.required],
      company: ['', Validators.required],
    });
  }

  get f() { return this.employeeForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;
    this.employeeService.addEmployee(this.employeeForm.value).pipe(first())
      .subscribe(
        response => {
          this.dialogRef.close(response);
        }
      ), (error: any) => {
        this.loading = false
      }
    // this.authService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });
  }

  closeModal(): void {
    this.dialogRef.close('CANCEL');
  }
}
