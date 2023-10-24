import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";
import { ERoles } from "../model/userData.model";
import {map, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CanActivateRoleGuard implements CanActivate {

  exeptedRole!: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticatedUser = this.authenticationService.isAuthetnicated;
    if (authenticatedUser) {
      const ROLES = ERoles;
      const ADMIN_HOME_PAGE = 'rihanna';
      const USER_HOME_PAGE = 'tour-list';
      let accessPages: boolean[] = [];
      let access: boolean;

      const userRole = of(authenticatedUser).pipe(
        map((userData)=> JSON.parse(userData)),
        map((user) => {
            switch (user.role) {
              case ROLES.admin :
                access = !state.url.includes(USER_HOME_PAGE);
                break;
              case ROLES.user :
                access = !state.url.includes(ADMIN_HOME_PAGE);
                break;
              default :
                return false;
            }
          return  accessPages.push(access);
        })
      ).subscribe();

      if (accessPages.some((access) => access)) {
        return true;
      }
      // role is not authorized
      else {
        this.router.navigate(['signin']);
        this.authenticationService.unstoreUserData();
        return false;
      }
      // }
    }

    // user is not logged so ridirect to login page with the return url
    this.authenticationService.unstoreUserData();
    this.router.navigate(['signin'], {queryParams: {returnUrl: state.url}});
    return false;
  }


}

