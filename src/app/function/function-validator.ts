import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {map, Observable, take} from "rxjs";

export class ValidatorsRegexPatterns {

  textPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ\\s\\-\\+\\&\\,\\.\']+';
  numberPattern = '^-?[0-9]\\d*(\\,\\d{1,2})?$';
  addressPattern = '^[A-Za-z0-9 ,.-]+$';
  cityPattern = '^[a-zA-Z ]{1,19}$';
  phoneNumberPattern = '^(\\+\\d{3})?\\s?\\d{3}\\s?\\d{3}\\s?\\d{3,4}$';

  MatchValidator(checkpassword: string): ValidatorFn {
    return (control): ValidationErrors | null => {
      if (control && control.value) {
        const form = control.parent;
        if (control.value !== form?.get(checkpassword)?.value) {
          return {notMatch: true};
        }

        return null;
      }

      return {notMatch: true};
    };
  }

  MatchValidatorEmail(asyncCall: (value: any) => Observable<boolean>): AsyncValidatorFn {
    return (control): Observable<ValidationErrors | null> => {
      return asyncCall(control.value).pipe(
        map(match => match ? null : {notMatch: true})
      );
    };
  }


}
