import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewadminComponent } from './component/viewadmin/viewadmin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { DevExtComponent } from './component/dev-ext/dev-ext.component';
import { DxAutocompleteModule } from 'devextreme-angular';

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
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ObserversModule,
    DxAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
