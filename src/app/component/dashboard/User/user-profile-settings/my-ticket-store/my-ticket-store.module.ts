import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyTicketStoreComponent } from "./my-ticket-store.component";
import { MyTicketStoreRoutingModule } from "./my-ticket-store.routing.module";

@NgModule({
  declarations: [ MyTicketStoreComponent ],
  imports:[
    CommonModule,
    MyTicketStoreRoutingModule,
  ]
})

export class MyTicketStoreModule {}
