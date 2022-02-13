import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API = `${environment.API}/employee`

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API).pipe(
      first()
    );
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(this.API, employee).pipe(
      first()
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.API + `/${id}`).pipe(
      first()
    )
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    console.log(employee)
    return this.httpClient.put<Employee>(this.API + `/${id}`, employee).pipe(
      first()
    )
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(this.API + `/${id}`).pipe(
      first()
    )
  }
}
