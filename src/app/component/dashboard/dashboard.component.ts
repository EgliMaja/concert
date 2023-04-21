import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userRole : string[];
  private adminRole : string[];
  role: string[] =['ADMIN','USER']

  constructor(private userService : UserService) {
    this.userRole = ['USER'];
    this.adminRole = ['ADMIN'];
   }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userService.getRegisterList().subscribe({
      next:(res)=>{
        if(this.adminRole = res[0].role){
          this.role[0];
          console.log(this.role , 'Admin Role')
        }
        else{
          this.role[1];
          console.log(this.role , 'User Role')
        }
      },
      error : (err) => {
        console.log(err)
      },
    })
  }

}
