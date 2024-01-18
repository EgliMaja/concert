import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { SidebarMenu } from '../../../model/sidebar-menu.model';
import { SidebarMenuService } from 'src/app/service/sidebar-menu.service';
import { AuthUserService } from "../../../service/auth-user.service";
import { ERoles, UserDataModel } from "../../../model/userData.model";
import { AuthenticationService } from "../../../service/authentication.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit  {

  menu!: SidebarMenu[];
  sidebarMenu: SidebarMenu[] = [];
  url!: string;
  logedUserName! : string;
  logedLastName! : string;
  userData!: UserDataModel;
  userRoles :any = [
    ERoles.admin,
    ERoles.user
  ];

  constructor(
    private _router: Router,
    private menuService: SidebarMenuService ,
    private activatedRoute: ActivatedRoute,
    private authService: AuthUserService,
    private authenticationService: AuthenticationService,
    )  {
    if(this.authenticationService.isAuthetnicated){
      this.userData = JSON.parse(this.authenticationService.isAuthetnicated);
    }
  }

  ngOnInit(): void {
    this.getMenu();
    this.getUserData();
  }

  getMenu():void{
    this.menuService.getMenuData().subscribe({
      next:(res)=>{
        this.menu = res.data;
        if (this.userData.role == this.userRoles[0]){
          this.sidebarMenu = this.menu.filter(item =>
            item.function.includes('0'));
        } else  {
          this.sidebarMenu = this.menu.filter(item =>
          item.function.includes('1'));
        }
      },
      error :(err)=> {
        console.log(err);
      },
    })
  }

  getUserData(){
    this.logedUserName = this.userData.firstName;
    this.logedLastName = this.userData.lastName;
  }

  navigateToComponent(route: SidebarMenu){
    this.url = route.action;
    this._router.navigate([route.action] , {relativeTo: this.activatedRoute});
  }

  goToProfileSettings(){
    if(this.userData.role == this.userRoles[1]){
      this._router.navigate(['home/my-area/'+ this.userData.id]);
    } else{
      this._router.navigate(['home/my-area/'+this.userData.id+ '/my-profile/'+ this.userData.id]);
    }
  }

  // Do not allow return back
 logout(){
    this.authService.logout();
  }

}
