import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AuthUserService } from "../../../../service/auth-user.service";
import { Subject, takeUntil } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ValidatorsRegexPatterns } from "../../../../function/function-validator";
import {ERoles, UserDataModel} from "../../../../model/userData.model";

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.scss']
})
export class UserProfileSettingsComponent implements OnInit , AfterViewInit , OnDestroy{

  id!: number;
  userProfileFormGroup!: FormGroup;
  userData!: UserDataModel;
  private $destroy : Subject<boolean> = new Subject<boolean>();
  @ViewChild('userProfile') userProfile :any;
  loadingSpinner: boolean = true;
  isVisiblePassword: boolean = false;
  userRoles :any = [
    ERoles.admin,
    ERoles.user
  ];
  constructor(
      private authorService : AuthUserService,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private _router: Router,
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getUserProfileByID();
    this.validatorsForm();
  }

  ngAfterViewInit() {
    this.loadingUserProfile();
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  validatorsForm(){
    this.userProfileFormGroup = this.formBuilder.group({
      email: new FormControl(
          {value: this.userData?.email , disabled: true},
          Validators.compose([Validators.required, Validators.email])),

      password: new FormControl(
          {value: this.userData?.password , disabled: true},
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])),
    })
  }

  get email() { return this.userProfileFormGroup.get('email') };
  get password() { return this.userProfileFormGroup.get('password') };

  getUserProfileByID(){
    this.authorService.getUserProfileByID(this.id).pipe(
        takeUntil(this.$destroy)
    ).subscribe({
      next:(res)=>{
        this.userData = {
          email: res[0]?.email,
          password: res[0]?.password,
          firstName: res[0]?.firstName,
          lastName: res[0]?.lastName,
          role: res[0]?.role,
          phone: res[0]?.phone,
          id: res[0]?.id
        } as UserDataModel;
        this.loadingSpinner = false;
      },
      error:(err)=>{
        console.log(err);
        this.loadingSpinner = false;
      },
      complete:()=>{
        this.userProfileFormGroup.patchValue(this.userData);
      }
    })
  }

  loadingUserProfile(){
    setTimeout(()=>{
      this.loadingSpinner = !this.userProfile;
    } , 500);
  }

  visiblePassword(){
    this.isVisiblePassword = true;
  }

  hidePassword(){
    this.isVisiblePassword = false;
  }

  navigateToMyPtofile(){
    this._router.navigate(['home/my-area/'+this.userData.id+ '/my-profile/'+ this.userData.id]);
  }

  navigateToMyTicketStore(){
    this._router.navigate(['home/my-area/'+this.userData.id+ '/my-ticket-store/'+ this.userData.id]);
  }

}
