import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-modal-add',
  templateUrl: './company-modal-add.component.html',
  styleUrls: ['./company-modal-add.component.scss']
})
export class CompanyModalAddComponent implements OnInit {
  companyForm: FormGroup;
  submitted = false;
  loading = false;
  // companies: Company[] = []

  constructor(
    public dialogRef: MatDialogRef<CompanyModalAddComponent>,
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) { }

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
    this.companyService.addCompany(this.companyForm.value).pipe(first())
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
