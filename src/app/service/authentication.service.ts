import { inject, Injectable } from "@angular/core";
import { ERoles, UserDataModel } from "../model/userData.model";
import { Router } from "@angular/router";
import { delay, dematerialize, materialize, throwError } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    router = inject(Router);
    userData!: UserDataModel;

    constructor(private  _snackBar: MatSnackBar) { }

   /**  store the user in local storage **/
    storeUserData(user: UserDataModel){
        sessionStorage.setItem('UserData', JSON.stringify(user));
        setTimeout(() => {
          this.restoreUserData();
          this.openSnackBar('Your Session has Expired , Please Login Again!' , 'Close');
          this.router.navigate(['signin'], {queryParams: {returnUrl: ''}});
          console.log('Session Expired')
        }, 500000);
    }


    /** Unstore the user from local storage **/
    restoreUserData(){
      sessionStorage.removeItem('UserData');
      sessionStorage.clear();
      this.router.createUrlTree(['signin']);
    }


    /** Get loged user the data  **/
    public get token(): string {
        const token = sessionStorage.getItem('UserData');
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

   /** Snackbar to Notify User **/
   openSnackBar(message: string, action: string) {
     this._snackBar.open(message, action);
   }
}
