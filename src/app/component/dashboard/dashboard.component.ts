import { Component, OnInit } from '@angular/core';
import { ERoles, userData } from 'src/app/model/userData';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData! : userData[];
  userRole : typeof ERoles = ERoles;

  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.getRegisterList().subscribe({
      next:(res)=>{
        this.userData = res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
