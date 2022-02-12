import { Company } from './../models/company.model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private API = `${environment.API}/company`

  constructor(private httpClient: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.API).pipe(
      first(),
      tap(
        data => console.log(data)
      )
    );
  }

  addCompany(Company: Company): Observable<any> {
    return this.httpClient.post(this.API, Company).pipe(
      first(),
      tap(
        data => console.log(data)
      )
    );
  }

  getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(this.API + `/${id}`).pipe(
      first()
    )
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    return this.httpClient.put<Company>(this.API + `/${id}`, company).pipe(
      first()
    )
  }

  deleteCompany(id: number): Observable<Company> {
    return this.httpClient.delete<Company>(this.API + `/${id}`).pipe(
      first()
    )
  }
}
