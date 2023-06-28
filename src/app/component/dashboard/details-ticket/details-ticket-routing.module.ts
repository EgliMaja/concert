import { NgModule } from '@angular/core';
import { RouterModule , Routes } from "@angular/router";
import { DetailsTicketComponent } from "./details-ticket.component";

const  route: Routes = [
  {path: '' , component : DetailsTicketComponent}
]
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class DetailsTicketRoutingModule { }

