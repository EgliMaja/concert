import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from "../../service/authentication.service";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private authentificationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([400 , 401 , 403 , 404 , 415 ].includes(err.status)){
        this.authentificationService.unstoreUserData();
      }
      const  errror = err.error.message || err.statusText;
      return throwError(()=> errror);
    }))
  }

}
