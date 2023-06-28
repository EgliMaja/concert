import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsTicketComponent } from "./details-ticket.component";
import { DetailsTicketRoutingModule } from "./details-ticket-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [DetailsTicketComponent],
  imports: [
    CommonModule,
    DetailsTicketRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],

})
export class DetailsTicketModule {}
