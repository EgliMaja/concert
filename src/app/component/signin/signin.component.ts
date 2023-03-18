import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  emailFormControl = new FormControl()
  passwordFormControl = new FormControl() as any
  constructor() {
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl('', Validators.required)
  }

  ngOnInit(): void {
  }

}
