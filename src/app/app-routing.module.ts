import { CompanyListComponent } from './components/company-list/company-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'company', component: CompanyListComponent },

  { path: '**', redirectTo: 'employee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
