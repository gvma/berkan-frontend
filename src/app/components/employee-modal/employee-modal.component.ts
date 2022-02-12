import { Employee } from './../../models/employee.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee, public dialogRef: MatDialogRef<EmployeeModalComponent>) { }

  ngOnInit(): void {
  }
  
  closeModal(): void {
    this.dialogRef.close('CANCEL');
  }

}
