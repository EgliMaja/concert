import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenu } from 'src/app/model/sidebar-menu-model';
import { SidebarMenuService } from 'src/app/service/sidebar-menu.service';
import { UserData } from "../../../model/userData";
import { AuthUserService } from "../../../service/auth-user.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  menu!: SidebarMenu[];
  url!: string;
  logedUserName! : string;
  logedLastName! : string;
  constructor(
    private _router: Router ,
    private menuService: SidebarMenuService ,
    private activatedRoute : ActivatedRoute,
    private user_service : AuthUserService,
    )  { }

  ngOnInit(): void {
    this.getMenu();
    this.getUserData();
  }

  getMenu():void{
    this.menuService.getMenuData().subscribe({
      next:(res)=>{
        this.menu = res.data;
        console.log(this.menu);
      },
      error :(err)=> {
        console.log(err);
      },
    })
  }

  getUserData(){
    this.user_service.getAllUsersList().subscribe({
      next:(res)=>{
        const logedUser = res.find((user:UserData)=>{
          this.logedUserName = user.firstName;
          this.logedLastName = user.lastName;
          return user.firstName || user.lastName;
        })
        if (logedUser){
        logedUser.firstName = this.logedUserName;
        logedUser.lastName = this.logedLastName;
        }
        console.log('USER', this.logedUserName);
      },
      error:(err)=> {
        console.log(err)
      },
    })
  }

  navigateToComponent(route: string){
    this.url = route;
    this._router.navigate([route],{relativeTo: this.activatedRoute})
  }



}
