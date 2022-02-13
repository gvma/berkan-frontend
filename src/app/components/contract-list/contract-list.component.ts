import { ServiceProvisionAddModalComponent } from './../service-provision-add-modal/service-provision-add-modal.component';
import { ContractModalComponent } from './../contract-modal/contract-modal.component';
import { ContractAddModalComponent } from './../contract-add-modal/contract-add-modal.component';
import { ContractService } from './../../services/contract.service';
import { Contract } from './../../models/contract.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { ServiceProvision } from 'src/app/models/serviceProvision.model';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  displayedColumns = ['hiringCompany', 'hiredCompany', 'initial_date', 'end_date', 'action']
  dataSource: ContractService | null;
  data: Contract[] = []

  resultLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  constructor(public dialog: MatDialog,
    private contractService: ContractService,
    private _httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource = new ContractService(this._httpClient);
    merge()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource!.getContracts();
        }),
        map(result => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;

          const data = result
          this.resultLength = result.length;
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

  openContract(contract: Contract) {
    this.dialog.open(ContractModalComponent, { data: contract })
  }

  addContract() {
    const dialog = this.dialog.open(ContractAddModalComponent)
    dialog.afterClosed().subscribe(result => {
      if (result == 'CANCEL') {
        return;
      }
      this.ngAfterViewInit();
    });
  }

  deleteContract(id: number) {
    if (confirm('Deseja deletar esse contrato?')) {
      this.contractService.deleteContract(id).subscribe(
        result => {
          this.ngAfterViewInit()
        }
      );
    }
  }

  provideService() {
    const dialog = this.dialog.open(ServiceProvisionAddModalComponent)
    dialog.afterClosed().subscribe(result => {
      if (result == 'CANCEL') {
        return;
      }
      this.ngAfterViewInit();
      this.ngOnInit();
    });
  }
}
