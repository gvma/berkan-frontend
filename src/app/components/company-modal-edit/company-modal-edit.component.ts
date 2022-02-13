import { Company } from './../../models/company.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-company-modal-edit',
  templateUrl: './company-modal-edit.component.html',
  styleUrls: ['./company-modal-edit.component.scss']
})
export class CompanyModalEditComponent implements OnInit {
  companyForm: FormGroup;
  submitted = false;
  loading = false;
  company: Company;

  constructor(
    public dialogRef: MatDialogRef<CompanyModalEditComponent>,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {
    this.company = data;
  }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() { return this.companyForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
      return;
    }

    this.loading = true;
    this.companyService.updateCompany(this.company.id, this.companyForm.value).pipe(first())
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
