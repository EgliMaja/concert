import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthUserService } from "../../../../service/auth-user.service";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ERoles, UserDataModel } from "../../../../model/userData.model";

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.scss']
})

export class UserProfileSettingsComponent implements OnInit, OnDestroy {

  id!: number;
  userData!: UserDataModel;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  @ViewChild('userProfile') userProfile: any;
  isVisiblePassword: boolean = false;
  userRoles: any = [
    ERoles.admin,
    ERoles.user
  ];

  constructor(
    private authorService: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUserProfileByID();
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }


  getUserProfileByID() {
    this.authorService.getUserProfileByID(this.id).pipe(
      takeUntil(this.$destroy)
    ).subscribe({
      next: (res) => {
        this.userData = {
          email: res[0]?.email,
          password: res[0]?.password,
          firstName: res[0]?.firstName,
          lastName: res[0]?.lastName,
          role: res[0]?.role,
          phone: res[0]?.phone,
          id: res[0]?.id
        } as UserDataModel;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  visiblePassword() {
    this.isVisiblePassword = true;
  }

  hidePassword() {
    this.isVisiblePassword = false;
  }

  navigateToMyPtofile() {
    this._router.navigate(['home/my-area/' + this.userData.id + '/my-profile/' + this.userData.id]);
  }

  navigateToMyTicketStore() {
    this._router.navigate(['home/my-area/' + this.userData.id + '/my-ticket-store/' + this.userData.id]);
  }

  navigateToFAQ(){
    this._router.navigate(['home/frequently-asked-questions'])
  }

}
