import { Contract } from './../models/contract.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private API = `${environment.API}/contract`

  constructor(private httpClient: HttpClient) { }

  getContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(this.API).pipe(
      first()
    );
  }

  addContract(contract: Contract): Observable<any> {
    return this.httpClient.post(this.API, contract).pipe(
      first()
    );
  }

  getContractById(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(this.API + `/${id}`).pipe(
      first()
    )
  }

  updateContract(id: number, contract: Contract): Observable<Contract> {
    return this.httpClient.put<Contract>(this.API + `/${id}`, contract).pipe(
      first()
    )
  }

  deleteContract(id: number): Observable<Contract> {
    return this.httpClient.delete<Contract>(this.API + `/${id}`).pipe(
      first()
    )
  }
}
