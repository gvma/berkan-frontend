import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-contract-add-modal',
  templateUrl: './contract-add-modal.component.html',
  styleUrls: ['./contract-add-modal.component.scss']
})
export class ContractAddModalComponent implements OnInit {
  contractForm: FormGroup;
  submitted = false;
  loading = false;
  companies: Company[] = []

  constructor(
    public dialogRef: MatDialogRef<ContractAddModalComponent>,
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private companyService: CompanyService
  ) {
    this.companyService.getCompanies().subscribe(
      response => {
        this.companies = response
      }
    )
  }

  ngOnInit(): void {
    this.contractForm = this.formBuilder.group({
      hiringCompany: ['', Validators.required],
      hiredCompany: ['', Validators.required],
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  get f() { return this.contractForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contractForm.invalid) {
      return;
    }

    this.loading = true;
    this.contractService.addContract(this.contractForm.value).pipe(first())
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
