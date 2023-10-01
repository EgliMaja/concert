import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { AuthUserService } from "./service/auth-user.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PendingChangesGuard } from "./guard/can-deactivate.guard";
import { CanActivateRoleGuard } from "./guard/can-activate-role.guard";
import { AuthUserInterceptor } from "./guard/core/authUser-interceptor";
import { ErrorCatchingInterceptor } from "./guard/core/error-catching-interceptor";

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
    MatSnackBarModule
  ],
  providers:[
    AuthUserService,
    PendingChangesGuard,
    CanActivateRoleGuard,
    AuthUserInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthUserInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
