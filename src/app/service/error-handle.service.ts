import { Injectable } from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ErrorHandleService {

  static error: Error;
  errorStatus!: number;
  errorMessage!: string;

  public set setError(error:any){
    this.errorStatus = error?.status;
    this.errorMessage = error?.message;
  }

 public get getError() {
    switch (this.errorStatus) {
        case 0:
            return "Unknown error";
        case 400:
            return 'The request was invalid.';
        case 401:
            return 'You are not authorized to access this resource.';
        case 403:
            return "Access to this resource is forbidden.";
        case 404:
            return "The requested resource was not found.";
        case 409:
            return "he request could not be completed due to a conflict with the current state of the resource.";
        default:
            return "Something bad happened; please try again later.";
    }
 }
}
