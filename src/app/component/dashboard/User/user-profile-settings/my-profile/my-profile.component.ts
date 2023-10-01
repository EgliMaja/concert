import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ValidatorsRegexPatterns } from "../../../../../function/function-validator";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { AuthUserService } from "../../../../../service/auth-user.service";
import { UserData } from "../../../../../model/userData";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit , AfterViewInit , OnDestroy{

  @ViewChild('profileData',{static: false}) profileData: any;
  userData!: UserData;
  formGroupProfile!: FormGroup;
  private destroyer$: Subject<boolean> = new Subject<boolean>();
  loadingSpinner: boolean = true;
  id!: number;
  isVisiblePassword:boolean = false;
  isBtnChangeDataClicked:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private  _snackBar: MatSnackBar
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getMyProfileData();
    this.myProfileFormValidations();
  }

  ngAfterViewInit() {
    this.loadingProfileData();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

  myProfileFormValidations(){
    let validatorPattern = new ValidatorsRegexPatterns();
    this.formGroupProfile = this.formBuilder.group({
      firstName: new FormControl({value: this.userData?.firstName , disabled: true},
        Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)])),

      lastName: new FormControl({value:this.userData?.lastName , disabled: true},
        Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)])),

      phone: new FormControl({value: this.userData?.phone , disabled: true},
        Validators.compose([Validators.required, Validators.minLength(12),
          Validators.pattern(validatorPattern.phoneNumberPattern)])),

      email: new FormControl({value: this.userData?.email , disabled: true},
          Validators.compose([Validators.required, Validators.email])),

      password: new FormControl({value:this.userData?.password , disabled: true},
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])),

      role: new FormControl({value: this.userData?.role , disabled: true},
        Validators.compose([Validators.required])),
    })
  }

  // Get the User Data by Param ID
  getMyProfileData(){
    this.authService.getUserProfileByID(this.id).pipe(
      takeUntil(this.destroyer$)
    ).subscribe({
      next:(res)=>{
        this.userData = {
          firstName: res[0]?.firstName,
          lastName: res[0]?.lastName,
          phone: res[0]?.phone,
          email: res[0]?.email,
          password: res[0]?.password,
          role: res[0]?.role,
          id: res[0]?.id
        } as  UserData;
        this.loadingSpinner = false;
      },
      error:(err)=>{
        console.log(err)
        this.loadingSpinner = false;
      },
      complete:()=>{
        this.formGroupProfile.patchValue(this.userData);
      }
    })
  }

  // Set Loading Indicator into the component before loading data
  loadingProfileData(){
    setTimeout(() => {
      if (this.profileData){
        this.myProfileFormValidations();
        this.loadingSpinner = false;
      } else {
        this.loadingSpinner = true;
      }
    }, 500);
  }

  visiblePassword(){
    this.isVisiblePassword = true;
  }

  hidePassword(){
    this.isVisiblePassword = false;
  }

  makeFieldsEnabled(){
    this.isBtnChangeDataClicked = false;
    this.firstName?.enable();
    this.lastName?.enable();
    this.phoneNumber?.enable();
    this.currentPassword?.enable();
  }

  // Get Validation Properties to show the error for UI
  get firstName() { return this.formGroupProfile.get('firstName') };
  get lastName() { return this.formGroupProfile.get('lastName') }
  get phoneNumber() { return this.formGroupProfile.get('phone') };
  get email() { return this.formGroupProfile.get('email') };
  get role() { return this.formGroupProfile.get('role') };
  get currentPassword() { return this.formGroupProfile.get('password') };


 //Modify mt profile data
 updateProfile(data: FormGroup){
   data = this.formGroupProfile;
   this.userData = {
     firstName: data.get('firstName')?.value,
     lastName: data.get('lastName')?.value,
     phone: data.get('phone')?.value,
     email: data.get('email')?.value,
     password: data.get('password')?.value,
     role: data.get('role')?.value,
     id: this.id
   } as  UserData;
   this.authService.updateUserProfile(this.userData).subscribe({
     next:(res)=>{
       this.openSnackBar('Data Updated Successfully!' , "Close");
     },
     error:(err: HttpErrorResponse)=>{
       this.openSnackBar( err.message , "Close")
     },
     complete:()=>{
       this.formGroupProfile.disable();
       this.getMyProfileData();
       this.isBtnChangeDataClicked = true;
     }
   })
 }

  // Notificationss
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
