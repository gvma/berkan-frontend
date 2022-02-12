import { EmployeeModalAddComponent } from './../employee-modal-add/employee-modal-add.component';
import { EmployeeModalComponent } from './../employee-modal/employee-modal.component';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from './../../services/company.service';
import { Company } from './../../models/company.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first, map, merge, of, startWith, switchMap } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns = ['name', 'admissionDate', 'company', 'action']
  dataSource: EmployeeService | null;
  data: Employee[] = []

  resultLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  constructor(
    public dialog: MatDialog,
    private employeeService: EmployeeService,
    private _httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    this.dataSource = new EmployeeService(this._httpClient);
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource!.getEmployees();
        }),
        map(result => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          console.log(result)
          const data = result
          console.log(data)
          // this.resultsLength = result.length;
          return data;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          console.log(error);
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  openDialog(employee: Employee) {
    this.dialog.open(EmployeeModalComponent, { data: employee })
  }

  addEmployee() {
    const dialog = this.dialog.open(EmployeeModalAddComponent)
    dialog.afterClosed().subscribe(result => {
      if (result == 'CANCEL') {
        return;
      }
      this.ngAfterViewInit();
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Deseja deletar esse empregado?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        result => {
          this.ngAfterViewInit()
        }
      );
    }
  }
}
