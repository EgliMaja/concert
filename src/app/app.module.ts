import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { AuthUserService } from "./service/auth-user.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { PendingChangesGuard } from "./guard/can-deactivate.guard";
import { CanActivateRoleGuard } from "./guard/can-activate-role.guard";
import { AuthUserInterceptor } from "./guard/core/authUser-interceptor";
import { ErrorCatchingInterceptor } from "./guard/core/error-catching-interceptor";
import { TranslateLoader , TranslateModule } from "@ngx-translate/core"
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

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
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new  TranslateHttpLoader(http , './assets/i18n/' , '.json')
}
