import { inject, Injectable } from "@angular/core";
import { UserData } from "../model/userData";
import { Router } from "@angular/router";
import { delay, dematerialize, materialize, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    router = inject(Router)

    /**  store the user in local storage **/
    storeUserData(user: UserData){
        localStorage.setItem('userData', JSON.stringify(user));
    }

    /** Unstore the user from local storage **/
    unstoreUserData(){
        localStorage.removeItem('userData');
        this.router.createUrlTree(['signin']);
    }


    /** Get loged user the data  **/
    public get token(): string {
        const token = localStorage.getItem('userData');
        return JSON.stringify(token);
    }

    /** Is user logged **/
    public get isAuthetnicated(){
        return JSON.parse(this.token);
    }

    /** Unathorized User **/
    public get isUnathorized(){
      return throwError(()=> ({status: 401, error: {message: 'You are not allowed!'}}))
        .pipe(materialize() , delay(300) , dematerialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
    }
}
