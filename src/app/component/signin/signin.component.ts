import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ERoles, userData} from 'src/app/model/userData';
import { UserService } from 'src/app/service/user-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  login! : FormGroup;
  private api: string;
  userRole:any[] = [
      ERoles.admin,
      ERoles.user
  ];
  constructor(
    private route: Router ,
    private httpClient : HttpClient ,
    private fb : FormBuilder,
    private userService : UserService
    )
    {
    this.api = environment.api + 'userDataData/';
    }

  ngOnInit(): void {
    this.validatorForm();
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

  signin(login : FormGroup){
    this.httpClient.get<userData[]>(this.api).subscribe({
      next:(res)=>{
        const user = res.find((userType: userData)=> {
          return userType.email === this.login.value.email && userType.password === this.login.value.password;
        })
        if(user){
          this.login.reset();
          this.route.navigate(['home/rihanna'])
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
    })
  }

}
