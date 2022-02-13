import { Employee } from 'src/app/models/employee.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-modal-edit',
  templateUrl: './employee-modal-edit.component.html',
  styleUrls: ['./employee-modal-edit.component.scss']
})
export class EmployeeModalEditComponent implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  loading = false;
  companies: Company[] = [];
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalEditComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    console.log(data)
    this.employee = data;
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
    this.employeeService.updateEmployee(this.employee.id, this.employeeForm.value).pipe(first())
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
