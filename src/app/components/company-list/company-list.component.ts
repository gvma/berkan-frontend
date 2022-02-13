import { CompanyModalComponent } from './../company-modal/company-modal.component';
import { CompanyService } from 'src/app/services/company.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/models/company.model';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { CompanyModalAddComponent } from '../company-modal-add/company-modal-add.component';
import { CompanyModalEditComponent } from '../company-modal-edit/company-modal-edit.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  displayedColumns = ['name', 'action']
  dataSource: CompanyService | null;
  data: Company[] = []

  resultLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
    private _httpClient: HttpClient
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new CompanyService(this._httpClient);
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource!.getCompanies();
        }),
        map(result => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          const data = result
          // this.resultsLength = result.length;
          return data;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  openDialog(company: Company) {
    this.dialog.open(CompanyModalComponent, { data: company })
  }

  addCompany() {
    const dialog = this.dialog.open(CompanyModalAddComponent)
    dialog.afterClosed().subscribe(result => {
      if (result == 'CANCEL') {
        return;
      }
      this.ngAfterViewInit();
    });
  }

  updateCompany(company: Company) {
    const dialog = this.dialog.open(CompanyModalEditComponent, { data: company })
    dialog.afterClosed().subscribe(result => {
      if (result == 'CANCEL') {
        return;
      }
      this.ngAfterViewInit();
    });
  }

  deleteCompany(id: number) {
    if (confirm('Deseja deletar essa empresa?')) {
      this.companyService.deleteCompany(id).subscribe(
        result => {
          this.ngAfterViewInit()
        }
      );
    }
  }
}
