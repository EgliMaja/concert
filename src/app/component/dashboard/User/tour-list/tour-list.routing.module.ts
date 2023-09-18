import { NgModule } from "@angular/core";
import { Routes , RouterModule } from "@angular/router";
import { TourListComponent } from "./tour-list.component";

const route: Routes = [
  { path:'' , component: TourListComponent }
]

@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})

export class TourListRoutingModule {}
