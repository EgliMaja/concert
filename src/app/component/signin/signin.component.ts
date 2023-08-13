import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERoles, UserData } from 'src/app/model/userData';
import { AuthUserService } from '../../service/auth-user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  loginFormGroup! : FormGroup;
  private api: string;
  userRole:any[] = [
      ERoles.admin,
      ERoles.user
  ];
  user!: UserData | undefined;
  constructor(
    private route: Router ,
    private httpClient : HttpClient ,
    private fb : FormBuilder,
    private userService : AuthUserService,
    )
    {
    this.api = environment.api + 'userDataData/';
    }

  ngOnInit(): void {
    this.validatorForm();
  }

  validatorForm(){
    this.loginFormGroup = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required , Validators.minLength(8) , Validators.maxLength(15)])
    })
  }

  goToRegisterPage(){
    this.route.navigate(['signup'])
  }

  signin(login : FormGroup){
    this.userService.getRegisterList().subscribe({
      next:(res)=>{
        this.user = res.find((userType: UserData)=>{
          return userType.email === login.value.email && userType.password === login.value.password;
        });
        if(this.user){
          this.loginFormGroup.reset();
          this.route.navigate(['home/rihanna']);
          //     // This check should be functional when firstly
          //     // a person who registered in the app should be by default user 'USER'
          //     // else if (user?.role == this.userRole[1]){
          //     //   this.route.navigate(['path to navigate '])
          //     // }
        }
      },
      error:(error)=>{
        if(!this.user){
            console.log('User Not Found')
          if (error.status == 401 || error.status == 403){
            // console.log('User Not Found')
          }
        }
      }
    })
  }

}
