import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from "../../service/authentication.service";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        if (this.authenticationService.isAuthetnicated){
            const TOKEN = this.authenticationService.token;
            const API_URL_JSONSERVER = req.url.startsWith(environment.api);
            if(API_URL_JSONSERVER){
                const REQUEST = req.clone({
                    setHeaders: { TOKEN }
                })
               return  next.handle(REQUEST);
            }
            return  next.handle(req.clone());
        }
        return  next.handle(req.clone());
    }
}
