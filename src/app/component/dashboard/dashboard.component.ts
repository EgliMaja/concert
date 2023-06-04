import { Component, OnInit } from '@angular/core';
import { appRoles, userData } from 'src/app/model/userData';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData! : userData[];
  userRole! : appRoles;
  roleAdmin : any;
  roleUser : any;

  constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.getRegisterList().subscribe({
      next:(res)=>{
        this.userData = res;
        this.roleAdmin = this.userData[0].role[0];
        this.roleUser = this.userData[0].role[1];
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
