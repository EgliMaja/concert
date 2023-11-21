import { inject, Injectable } from "@angular/core";
import { ERoles, UserDataModel } from "../model/userData.model";
import { Router } from "@angular/router";
import { delay, dematerialize, materialize, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    router = inject(Router);
    userRoles :any = [
      ERoles.admin,
      ERoles.user
    ];


  /**  store the user in local storage **/
    storeUserData(user: UserDataModel){
        localStorage.setItem('userData', JSON.stringify(user));
    }

    /** Unstore the user from local storage **/
    unstoreUserData(){
        localStorage.removeItem('userData');
        localStorage.clear();
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

    /** Role Of Users **/
    public get Role(){
      if(this.isAuthetnicated){
        return this.userRoles;
      }
    }


    /** Unathorized User **/
    public get isUnathorized(){
      return throwError(()=> ({status: 401, error: {message: 'You are not allowed!'}}))
        .pipe(materialize() , delay(300) , dematerialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
    }
}
