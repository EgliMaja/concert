import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { CreateTicketService } from "./service/create-ticket.service";
import { AuthUserService } from "./service/auth-user.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ObserversModule,
  ],
  providers:[
    CreateTicketService,
    AuthUserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
