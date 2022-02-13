import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';
import { ServiceProvision } from 'src/app/models/serviceProvision.model';
import { ContractService } from 'src/app/services/contract.service';
import { ServiceProvisionAddModalComponent } from '../service-provision-add-modal/service-provision-add-modal.component';

@Component({
  selector: 'app-service-provision-list',
  templateUrl: './service-provision-list.component.html',
  styleUrls: ['./service-provision-list.component.scss']
})
export class ServiceProvisionListComponent implements OnInit {
  displayedColumns = ['employee', 'hiringCompany', 'initialDate', 'endDate', 'action']
  dataSource: ContractService | null;
  data: ServiceProvision[] = []

  resultLength = 0;
  isLoadingResults = true;
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
          return this.dataSource!.getServiceProvisions();
        }),
        map(result => {
          this.isLoadingResults = false;
          this.resultLength = result.length;
          const data = result
          return data;
        }),
        catchError(error => {
          this.isLoadingResults = false;
          this.resultLength = 0;
          return of([]);
        })
      )
      .subscribe(data => (this.data = data));
  }

  deleteServiceProvision(id: number) {
    if (confirm('Deseja deletar essa prestação de serviço?')) {
      this.contractService.deleteServiceProvision(id).subscribe(
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
    });
  }
}
