import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { MyProfileComponent } from "./my-profile.component";

const route: Routes = [
  { path:'' , component: MyProfileComponent }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class MyProfileRoutingModule {}
