import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ValidatorsRegexPatterns } from "../../../../../function/function-validator";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { AuthUserService } from "../../../../../service/auth-user.service";
import { UserDataModel } from "../../../../../model/userData.model";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnChanges,  OnDestroy{

  @ViewChild('profileData',{static: false}) profileData: any;
  userData!: UserDataModel;
  formGroupProfile!: FormGroup;
  sharedFormGroup!: FormGroup;
  private destroyer$: Subject<boolean> = new Subject<boolean>();
  id!: number;
  isVisiblePassword:boolean = false;
  isBtnChangeDataClicked:boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthUserService,
    private activatedRoute: ActivatedRoute,
    private  _snackBar: MatSnackBar
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnChanges() {
    console.log(this.userData, 'Changes')
  }

  ngOnInit(): void {
    this.getMyProfileData();
    this.myProfileFormValidations();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.complete();
  }

  myProfileFormValidations(){
    let validatorPattern = new ValidatorsRegexPatterns();
    this.sharedFormGroup = this.formBuilder.group({
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
    })

    this.formGroupProfile = this.formBuilder.group({
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
        } as  UserDataModel;
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this.formGroupProfile.patchValue(this.userData);
      }
    })
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
  get firstName() { return this.sharedFormGroup.get('firstName') };
  get lastName() { return this.sharedFormGroup.get('lastName') }
  get phoneNumber() { return this.sharedFormGroup.get('phone') };
  get email() { return this.sharedFormGroup.get('email') };
  get role() { return this.formGroupProfile.get('role') };
  get currentPassword() { return this.formGroupProfile.get('password') };


 //Modify mt profile data
 updateProfile(){
   let firstFormData = this.sharedFormGroup;
   let secondFormData = this.formGroupProfile;
   this.userData = {
     firstName: firstFormData.get('firstName')?.value,
     lastName: firstFormData.get('lastName')?.value,
     phone: firstFormData.get('phone')?.value,
     email: firstFormData.get('email')?.value,
     password: secondFormData.get('password')?.value,
     role: secondFormData.get('role')?.value,
     id: this.id
   } as  UserDataModel;
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
