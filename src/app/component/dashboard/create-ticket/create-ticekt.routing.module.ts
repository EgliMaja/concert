import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { CreateTicketComponent } from "./create-ticket.component";

const route : Routes = [
  { path: '' , component : CreateTicketComponent },
  {
    path: '**',
    loadChildren: ()=> import('src/app/component/dashboard/create-ticket/create-ticket.module').then((m)=> m.CreateTicketModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export  class CreateTicektRoutingModule {}
