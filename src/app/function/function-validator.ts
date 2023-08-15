import { ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidatorsRegexPatterns{


    textPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ\\s\\-\\+\\&\\,\\.\']+';
    numberPattern = '^-?[0-9]\\d*(\\,\\d{1,2})?$';
    addressPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\\s[a-zA-ZÀ-ÖØ-öø-ÿ]+),\\s\\d{1,4}(?:\\/\\d{1,4})?\\s*[a-zA-ZÀ-ÖØ-öø-ÿ]*$';
    cityPattern= '^[a-zA-Z ]{1,19}$';
    phoneNumberPattern = '^(\\+\\d{3})?\\s?\\d{3}\\s?\\d{3}\\s?\\d{3,4}$';
    MatchValidator(checkpassword: string): ValidatorFn {
        return (control): ValidationErrors | null => {
            if (control && control.value) {
                const form = control.parent;
                if (control.value !== form?.get(checkpassword)?.value) {
                    return { notMatch: true };
                }

                return null;
            }

            return { notMatch: true };
        };
    }

}
