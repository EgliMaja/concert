import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from 'src/app/model/userData';
import { MyserviceService } from 'src/app/service/myservice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  user: userData = {} as userData;
  login! : FormGroup;
  private api: string;
  dataUser! : userData;

  constructor(
    private route: Router ,
    private httpClient : HttpClient ,
    private fb : FormBuilder,
    private userService : MyserviceService
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
          this.route.navigate(['rihanna'])
        }
      },
      error : (err) => {
        console.log(err , 'This user Not Found');
      },
    })
  }

}
