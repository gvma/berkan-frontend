import { Company } from './../../models/company.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-modal',
  templateUrl: './company-modal.component.html',
  styleUrls: ['./company-modal.component.scss']
})
export class CompanyModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Company, public dialogRef: MatDialogRef<CompanyModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close('CANCEL');
  }
}
