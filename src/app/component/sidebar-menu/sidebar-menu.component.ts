import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarMenu } from 'src/app/model/sidebar-menu-model';
import { UserService } from 'src/app/service/user-service.service';
import { SidebarMenuService } from 'src/app/service/sidebar-menu.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  menu!: SidebarMenu[];
  url!: string;
  logedUserName! : string;
  logedUser : any[]=[];
  constructor(
    private _router: Router ,
    private menuService: SidebarMenuService ,
    private activatedRoute : ActivatedRoute,
    private user_service : UserService )  { }

  ngOnInit(): void {
    this.getMenu();
    this.getUserData();
  }

  getMenu():void{
    this.menuService.getMenuData().subscribe({
      next:(res)=>{
        this.menu = res.data;
        console.log(this.menu);
        // this.getMenuDataByRole();
      },
      error :(err)=> {
        console.log(err);
      },
    })
  }

  getUserData(){
    this.user_service.getRegisterList().subscribe({
      next:(res)=>{
        this.logedUser = Array(res.map((el=> {
          this.logedUserName = `${el.firstName}  ${el.lastName}`;
        })))

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
