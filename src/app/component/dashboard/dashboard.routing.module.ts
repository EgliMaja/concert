import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const route : Routes = [
  {path : '' , component : DashboardComponent}
]

@NgModule({
imports: [RouterModule.forChild(route)],
exports: [RouterModule]
})

export class DashboardRoutingModule {}
