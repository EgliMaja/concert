import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './component/add/add.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewadminComponent } from './component/viewadmin/viewadmin.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SigninComponent } from './component/signin/signin.component';
import { RegisterComponent } from './component/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ObserversModule } from '@angular/cdk/observers';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DevExtComponent } from './component/dev-ext/dev-ext.component';
import { DxAutocompleteModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    ViewadminComponent,
    NavbarComponent,
    SigninComponent,
    RegisterComponent,
    DevExtComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ObserversModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    DxAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
