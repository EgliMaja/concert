import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from "../../service/authentication.service";
import {LoadingService} from "../../service/loading.service";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService , private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      this.loadingService.setLoading(false);
      if ([400 , 401 , 403 , 415 ].includes(err.status)){
        this.loadingService.setLoading(false);
        this.authenticationService.restoreUserData();
      }
      const  errror = err.error.message || err.statusText;
      return throwError(()=> errror);
    }))
  }

}
