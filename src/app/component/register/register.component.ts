import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MyserviceService } from 'src/app/service/myservice.service';
import { userData } from 'src/app/data/userData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public personRegist: userData = {} as userData
  private userDatas: BehaviorSubject<userData[]> = new BehaviorSubject<userData[]>([]);
  userDatas$: Observable<userData[]> = this.userDatas.asObservable()
  registerPerson!: FormGroup;


  constructor(private service: MyserviceService, private route: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerPerson.valueChanges.pipe(tap()).subscribe()
    this.getuserData();
    this.validatorForm();
  }

  validatorForm() {
    this.registerPerson = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', [Validators.required, this.MatchValidator('password')])
    })
  }

  getuserData() {
    this.service.getRegisterList().subscribe(this.userDatas)
  }

  createAccount() {
    this.service.adduserData(this.personRegist).subscribe({
      next: (data: userData[]) => {
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
}
