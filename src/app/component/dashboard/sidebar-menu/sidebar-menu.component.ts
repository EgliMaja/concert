import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { SidebarMenu } from 'src/app/model/sidebar-menu-model';
import { SidebarMenuService } from 'src/app/service/sidebar-menu.service';
import { AuthUserService } from "../../../service/auth-user.service";
import { ERoles, UserData } from "../../../model/userData";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit  {

  menu!: SidebarMenu[];
  url!: string;
  logedUserName! : string;
  logedLastName! : string;
  userData!: UserData;
  userRoles :any = [
    ERoles.admin,
    ERoles.user
  ];

  constructor(
    private _router: Router,
    private menuService: SidebarMenuService ,
    private activatedRoute: ActivatedRoute,
    private authService: AuthUserService,
    )  {
    const storeUser = localStorage.getItem('userData');
    if(storeUser){
      this.userData = JSON.parse(storeUser);
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
        console.log(this.menu);
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

  navigateToComponent(route: string){
    this.url = route;
    this._router.navigate([route],{relativeTo: this.activatedRoute})
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
    this.authService.unstoreUserData();
    this._router.navigate(['signin']);
  }

}
