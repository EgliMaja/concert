import { inject, Injectable } from "@angular/core";
import { ERoles, UserDataModel } from "../model/userData.model";
import { Router } from "@angular/router";
import { delay, dematerialize, materialize, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    router = inject(Router);
    userData!: UserDataModel;

  /**  store the user in local storage **/
    storeUserData(user: UserDataModel){
        localStorage.setItem('UserData', JSON.stringify(user));
    }

    /** Unstore the user from local storage **/
    restoreUserData(){
        localStorage.removeItem('UserData');
        localStorage.clear();
        this.router.createUrlTree(['signin']);
    }


    /** Get loged user the data  **/
    public get token(): string {
        const token = localStorage.getItem('UserData');
        return JSON.stringify(token);
    }

    /** Is user logged **/
    public get isAuthetnicated(){
        return JSON.parse(this.token);
    }

    /** Role Of Users **/
    public get Role(): ERoles[] {
        if (this.isAuthetnicated){
            this.userData = JSON.parse(this.isAuthetnicated);
            return this.userData.role;
        }
        return [];
    }


    /** Unathorized User **/
    public get isUnathorized(){
      return throwError(()=> ({status: 401, error: {message: 'You are not allowed!'}}))
        .pipe(materialize() , delay(300) , dematerialize()) // call materialize and dematerialize to ensure delay even if an error is thrown
    }
}
