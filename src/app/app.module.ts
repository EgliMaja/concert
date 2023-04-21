import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewadminComponent } from './component/viewadmin/viewadmin.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ObserversModule } from '@angular/cdk/observers';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DevExtComponent } from './component/dev-ext/dev-ext.component';
import { DxAutocompleteModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    ViewadminComponent,
    DevExtComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
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
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
