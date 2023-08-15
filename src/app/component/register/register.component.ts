import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../../service/auth-user.service';
import { ERoles, UserData } from 'src/app/model/userData';
import { ValidatorsRegexPatterns } from "../../function/function-validator";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    userRegist!: UserData;
    registerFormGroup!: FormGroup;
    invalidRegistration: boolean = false;
    errorMessage!: string;
    appUserRoles: any[] = [
        ERoles.admin,
        ERoles.user
    ];
    constructor(
        private service: AuthUserService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.validatorForm();
    }

    validatorForm() {
        let validatorPattern = new ValidatorsRegexPatterns();
        this.registerFormGroup = this.formBuilder.group({
            firstName: new FormControl('',
                [Validators.required, Validators.minLength(3),
                    Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),

            lastName: new FormControl('',
                [Validators.required, Validators.minLength(3),
                    Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),

            phone: new FormControl('',
                [Validators.required, Validators.minLength(12),
                    Validators.pattern(validatorPattern.phoneNumberPattern)]),

            email: new FormControl('', [Validators.required, Validators.email]),

            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),

            confirm_password: new FormControl('', [Validators.required, validatorPattern.MatchValidator('password')])
        })
    }

    // Get Validation Properties to show the error for UI
    get firstName() { return this.registerFormGroup.get('firstName') };
    get lastName() { return this.registerFormGroup.get('lastName') }
    get phoneNumber() { return this.registerFormGroup.get('phone') };
    get email() { return this.registerFormGroup.get('email') };
    get password() { return this.registerFormGroup.get('password') };
    get confrimPassword() {  return this.registerFormGroup.get('confirm_password') };


    // Create User Account
    createAccount(data: any) {

        this.userRegist = {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            password: data.confirm_password,
            role: this.appUserRoles[1],
            id: data.id,
        } as UserData;

        this.service.adduserData(this.userRegist).subscribe({
            next: (data: UserData[]) => {
                console.log(data)
                alert('You are registered Sucessfully');
                this.registerFormGroup.reset();
                this.router.navigate(['/signin'])
            },
            error: (err) => {
                this.invalidRegistration = true;
                if (err){
                    this.errorMessage = "Something went wrong";
                }
            }
        });
    }

    goToSigninPage() {
        this.router.navigate(['/signin'])
    }
}
