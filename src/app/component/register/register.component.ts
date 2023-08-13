import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthUserService } from '../../service/auth-user.service';
import { UserData } from 'src/app/model/userData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public personRegist: UserData = {} as UserData
  private userDatas: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  userDatas$: Observable<UserData[]> = this.userDatas.asObservable()
  registerPerson!: FormGroup;


  constructor(private service: AuthUserService , private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validatorForm();
  }

  validatorForm() {
    this.registerPerson = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8) , Validators.maxLength(15)]),
      confirm_password: new FormControl('', [Validators.required, this.MatchValidator('password')])
    })
  }


  createAccount() {
    this.service.adduserData(this.personRegist).subscribe({
      next: (data: UserData[]) => {
        console.log(data)
        alert('You are registered Sucessfully');
        this.route.navigate(['/signin'])
      },
      error: (err) => { console.log(err, 'Something went wrong'); }
    });
  }

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

  goToSigninPage(){
    this.route.navigate(['/signin'])
  }
}
