import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';
import { registerLocaleData } from '@angular/common';

import localePT from "@angular/common/locales/pt";
import { EmployeeModalAddComponent } from './components/employee-modal-add/employee-modal-add.component';
import { EmployeeModalEditComponent } from './components/employee-modal-edit/employee-modal-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyModalComponent } from './components/company-modal/company-modal.component';
import { CompanyModalAddComponent } from './components/company-modal-add/company-modal-add.component';
import { CompanyModalEditComponent } from './components/company-modal-edit/company-modal-edit.component';
registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeModalComponent,
    EmployeeModalAddComponent,
    EmployeeModalEditComponent,
    CompanyListComponent,
    CompanyModalComponent,
    CompanyModalAddComponent,
    CompanyModalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
