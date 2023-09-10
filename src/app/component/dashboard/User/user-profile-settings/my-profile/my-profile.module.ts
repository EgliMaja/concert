import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyProfileRoutingModule } from "./my-profile.routing.module";
import { MyProfileComponent } from "./my-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [ MyProfileComponent ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ]
})

export class MyProfileModule {}
