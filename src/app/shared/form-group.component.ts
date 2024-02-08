import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { ValidatorsRegexPatterns } from "../function/function-validator";
import { UserDataModel } from "../model/userData.model";
import { AuthenticationService } from "../service/authentication.service";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer , {skipSelf: true})
    }
  ],
  template: `
    <form [formGroupName]="controlKey">
      <div class="row">
        <div class="col-sm-6">
      <mat-form-field class="example-full-width px-5 mb-3">
      <!-- First Name -->
        <mat-label>First Name</mat-label>
        <input matInput type="text" placeholder="Your Name" name="firstName" formControlName="firstName" [readOnly]="isReadonly">
          <mat-hint  *ngIf="firstName?.invalid && (firstName?.touched ||  firstName?.dirty)"
                     class="text-danger fw-bold">
              <div *ngIf="firstName?.errors?.['required']">First Name is Required</div>
              <div *ngIf="firstName?.errors?.['minlength']">First Name should have at least 3 characters</div>
              <div *ngIf="firstName?.errors?.['maxlength']">First Name should have less than 21 characters</div>
              <div *ngIf="firstName?.errors?.['pattern']">Not Allowed Number Characters </div>
          </mat-hint>
      </mat-form-field>

        <!-- Email-->
        <mat-form-field class="example-full-width px-5 mb-3">
          <mat-label>Email</mat-label>
          <input matInput type="email" placeholder="Ex. pat@example.com" name="email" formControlName="email" [readOnly]="isReadonly">
          <mat-hint  *ngIf="email?.invalid && (email?.touched ||  email?.dirty)"
                     class="text-danger fw-bold">
            <div *ngIf="email?.errors?.['required']">Email is Required</div>
            <div *ngIf="email?.errors?.['email']">Missing @ character</div>
          </mat-hint>
        </mat-form-field>

      </div>

      <div class="col-sm-6">
        <!--Last Name-->
        <mat-form-field class="example-full-width px-5 mb-3">
          <mat-label>Last Name</mat-label>
          <input matInput type="text" placeholder="Last Name" name="lastName" formControlName="lastName" [readOnly]="isReadonly">
          <mat-hint  *ngIf="lastName?.invalid && (lastName?.touched ||  lastName?.dirty)"
                     class="text-danger fw-bold">
            <div *ngIf="lastName?.errors?.['required']">Last Name is Required</div>
            <div *ngIf="lastName?.errors?.['minlength']">Last Name should have at least 3 characters</div>
            <div *ngIf="lastName?.errors?.['maxlength']">Last Name should have less than 21 characters</div>
            <div *ngIf="lastName?.errors?.['pattern']">Not Allowed Number Characters </div>
          </mat-hint>
        </mat-form-field>

      <!--Phone Number -->
        <mat-form-field class="example-full-width px-5 mb-3">
          <mat-label>Telephone</mat-label>
          <input matInput type="phone" placeholder="+355 06X 123 1234" name="phone" formControlName="phone" [readOnly]="isReadonly">
          <mat-hint  *ngIf="phoneNumber?.invalid && (phoneNumber?.touched ||  phoneNumber?.dirty)"
                     class="text-danger fw-bold">
            <div *ngIf="phoneNumber?.errors?.['required']">Phone Number is Required</div>
            <div *ngIf="phoneNumber?.errors?.['minlength']">Phone Number should have at least 12 characters</div>
            <div *ngIf="phoneNumber?.errors?.['pattern']">Phone Number Format is not Correct! </div>
          </mat-hint>
        </mat-form-field>
      </div>
      </div>
    </form>

    <div *ngIf="!currentRoute">
      <div *ngIf="isBtnChangeDataClicked"  class="d-flex justify-content-center">
        <button class="btn btn-dark position-absolute" style="bottom: 230px; margin-left: -50px" (click)="toggleEnableInputs()">Change My Data</button>
      </div>
    </div>
  `,

})


export class  SharedReactiveFormComponent implements OnInit , OnDestroy {

  @Input() controlKey = '';
  @Input() isReadonly:boolean = true;
  @Output() makeFieldEnabled: EventEmitter<boolean> = new EventEmitter<boolean>();
  parentContainer = inject(ControlContainer);
  userData!: UserDataModel;
  isBtnChangeDataClicked:boolean = true;
  currentRoute!:boolean;

  get parentFormGroup() {
   return this.parentContainer.control as FormGroup;
  }

  constructor( private authenticationService: AuthenticationService , private router: Router) {
    if(this.authenticationService.isAuthetnicated){
      this.userData = JSON.parse(this.authenticationService.isAuthetnicated);
    }
    this.currentRoute = this.router.url.includes('home/booking')
    console.log(  this.router.url)

  }

  ngOnInit(){
    this.initializeForm();
    this.parentFormGroup.disabled;
  }

  ngOnDestroy(){
    this.parentFormGroup.removeControl(this.controlKey)
  }

  initializeForm(){
    let validatorPattern = new ValidatorsRegexPatterns();
    this.parentFormGroup.addControl( this.controlKey,
      new FormGroup({
        firstName: new FormControl({ value: this.userData.firstName , disabled: this.isReadonly} ,
            [Validators.required, Validators.minLength(3),
              Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),

        lastName: new FormControl({ value: this.userData.lastName , disabled: this.isReadonly} ,
            [Validators.required, Validators.minLength(3),
              Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),


        phone: new FormControl({ value: this.userData.phone , disabled: this.isReadonly},
            [Validators.required, Validators.minLength(12),
              Validators.pattern(validatorPattern.phoneNumberPattern)]),

        email: new FormControl({ value: this.userData.email , disabled: this.isReadonly},
            [Validators.required, Validators.email]),
      }) )
  }

  get firstName() { return this.parentFormGroup.controls['firstName'] };
  get lastName() { return this.parentFormGroup.controls['lastName'] }
  get phoneNumber() { return this.parentFormGroup.controls['phone'] };
  get email() { return this.parentFormGroup.controls['email'] };

 toggleEnableInputs(){
   this.isBtnChangeDataClicked = false;
   this.isReadonly = false;
   let validatorPattern = new ValidatorsRegexPatterns();
   this.parentFormGroup.addControl( this.controlKey,
     new FormGroup({
       firstName: new FormControl({ value: this.userData.firstName , disabled: false} ,
         [Validators.required, Validators.minLength(3),
           Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),

       lastName: new FormControl({ value: this.userData.lastName , disabled: false} ,
         [Validators.required, Validators.minLength(3),
           Validators.maxLength(20), Validators.pattern(validatorPattern.textPattern)]),


       phone: new FormControl({ value: this.userData.phone , disabled: false},
         [Validators.required, Validators.minLength(12),
           Validators.pattern(validatorPattern.phoneNumberPattern)]),

       email: new FormControl({ value: this.userData.email , disabled: false},
         [Validators.required, Validators.email]),
     }) )
   this.isReadonly ? this.makeFieldEnabled.emit(true) : this.makeFieldEnabled.emit(false);
 }

}
