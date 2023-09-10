import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERoles, UserData } from 'src/app/model/userData';
import { AuthUserService } from '../../service/auth-user.service';
import { DataSharingService } from "../../service/data-sharing.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit , AfterViewInit , OnDestroy{

  @ViewChild('displayErrorMsg') displayErrorMsg!: boolean;
  loadingSpinner!: boolean;
  loginFormGroup! : FormGroup;
  form:boolean = true;
  errormsg!: string;
  user!: UserData;
  private destroy$: Subject<void> = new Subject<void>();
  userRoles :any = [
      ERoles.admin,
      ERoles.user
  ];

  constructor(
    private route: Router ,
    private fb : FormBuilder,
    private userService : AuthUserService,
    private dataShared: DataSharingService,
  ) { }

  ngOnInit(): void {
    this.validatorForm();
  }

  ngAfterViewInit() {
    this.signinLoading();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  validatorForm(){
    this.loginFormGroup = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required , Validators.minLength(8)])
    })
  }

  // Reactive prop for validation validatorForm()
  get email() { return this.loginFormGroup.get('email') };
  get password() { return this.loginFormGroup.get('password') };

  signin(login: FormGroup){
    this.loadingSpinner = true;
    this.userService.login(login.value.email , login.value.password).pipe(
      takeUntil(this.destroy$.asObservable())
    ).subscribe({
      next:(res)=>{
        const userType = res.find((user: UserData) => {
          return user.password === login.value.password && user.email === login.value.email;
        });

        if (!userType) {
          return;
        }

        this.user = {
          email: userType.email,
          password: userType.password,
          firstName: userType.firstName,
          lastName: userType.lastName,
          role: userType.role,
          phone: userType.phone,
          id: userType.id
        };

        this.userService.storeUserData(this.user);

        if (userType.role === this.userRoles[0]) {
          this.route.navigate(['home/rihanna'], {state: this.user});
          this.loginFormGroup.reset();
        }

        else if (userType.role === this.userRoles[1]) {
          this.route.navigate(['home/rihanna'], {state: this.user});
          this.loginFormGroup.reset();
        }
      },
      error:(error: HttpErrorResponse)=>{
        this.loadingSpinner = false;
        this.displayErrorMsg = true;
          if (error.status == 401){
              this.errormsg = "This account has temporarily  blocked!";
          }
          if(error.status == 403){
            this.errormsg = "Bad credentials";
          }
          if(error.status == 404){
              this.errormsg = "This account does not exist!";
          }
          if(error.status == 405){
            this.errormsg = "Server connection error.";
          }
          if(error.status == 409){
            this.errormsg = "Server conflict. Please retry again later!" ;
          }
          else {
            this.errormsg = "Server connection refused."
          }
      },
      complete:()=>{
        this.loadingSpinner = false;
        this.displayErrorMsg = false;
      }
    });
  }

  // loading indicator
 signinLoading() {
    setTimeout(() => {
      if (this.displayErrorMsg) {
        this.loadingSpinner = false;
      }
    }, 100);
  }


  goToRegisterPage(){
    this.route.navigate(['signup'])
  }

}
