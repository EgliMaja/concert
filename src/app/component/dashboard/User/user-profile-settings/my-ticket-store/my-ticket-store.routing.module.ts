import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { MyTicketStoreComponent } from "./my-ticket-store.component";

const route: Routes = [
  { path: '' , component: MyTicketStoreComponent }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export  class MyTicketStoreRoutingModule {}
