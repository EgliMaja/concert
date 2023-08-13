import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ErrorHandleService {
    handleError(error: HttpErrorResponse) {
        let errorMessage ;
        if(error.error instanceof  ErrorEvent){
            errorMessage = error.error.message;                  //Client-side error
        } else if(error.status){
            errorMessage = this.getServerErrorMessage(error);    //Server-side error
        }
        return errorMessage;
    }

    private getServerErrorMessage(error: HttpErrorResponse){
        let errorMessage = "";
        switch (error.status){
            case 400:
                errorMessage = 'Bad Request: The request was invalid.';
                break;
            case 401:
                errorMessage = 'Unathorized: You are not authorized to access this resource.';
                break;
            case  403:
                errorMessage = "Forbidden: Access to this resource is forbidden."
                break;
            case 404:
                errorMessage = "Not Found: The Request Resource was not found."
                break;
            case 409:
                errorMessage = "Conflict: The request could not be completed due to a conflict with the current state of the resource."
                break;
            default: errorMessage = `Server Error: ${error.message}`
        }
    }
}
