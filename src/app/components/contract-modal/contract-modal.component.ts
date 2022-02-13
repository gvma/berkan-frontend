import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contract } from 'src/app/models/contract.model';

@Component({
  selector: 'app-contract-modal',
  templateUrl: './contract-modal.component.html',
  styleUrls: ['./contract-modal.component.scss']
})
export class ContractModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contract, public dialogRef: MatDialogRef<ContractModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close('CANCEL');
  }
}
