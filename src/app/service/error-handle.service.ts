import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {
  getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return error.error.message;
    } else if (error.status) {
      // Server-side error
      return this.handleError(error);
    } else {
      // Other types of error
      return "An error occurred.";
    }
  }
  private handleError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return "Unknown error "+error.error;
      case 400:
        return 'Bad Request: The request was invalid.';
      case 401:
        return 'Unauthorized: You are not authorized to access this resource.';
      case 403:
        return "Forbidden: Access to this resource is forbidden.";
      case 404:
        return "Not Found: The requested resource was not found.";
      case 409:
        return "Conflict: The request could not be completed due to a conflict with the current state of the resource.";
      default:
        return `Something bad happened; please try again later: ${error.message}`;
    }
  }

}
