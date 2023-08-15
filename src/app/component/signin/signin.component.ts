import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERoles, UserData } from 'src/app/model/userData';
import { AuthUserService } from '../../service/auth-user.service';
import { DataSharingService } from "../../service/data-sharing.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit , AfterViewInit{

  @ViewChild('displayErrorMsg') displayErrorMsg!: boolean;
  loadingSpinner!: boolean;
  loginFormGroup! : FormGroup;
  form:boolean = true;
  errormsg!: string;
  user!: UserData;
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

  validatorForm(){
    this.login = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(15)])
    })
  }

  goToRegisterPage(){
    this.route.navigate(['signup'])
  }

  signin(login: FormGroup){
    this.loadingSpinner = true;
    this.userService.login(login.value.email , login.value.password).subscribe({
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
          phone: userType.phone
        };

        this.dataShared.setDataUser(this.user);

        if (userType.role === this.userRoles[0]) {
          this.route.navigate(['home/rihanna']);
          this.loginFormGroup.reset();
        }

        else if (userType.role === this.userRoles[1]) {
          this.route.navigate(['**']);
          this.loginFormGroup.reset();
        }
        // This check should be functional when firstly
        // a person who registered in the app should be by default user 'USER'
        // else if (user?.role == this.userRole[1]){
        //   this.route.navigate(['path to navigate '])
        // }
      },
      error : (err) => {
        console.log(err , 'This user Not Found');
      },
      error:(error)=>{
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

}
