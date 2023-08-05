import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsTicketComponent } from "./details-ticket.component";
import { DetailsTicketRoutingModule } from "./details-ticket-routing.module";
@NgModule({
  declarations: [DetailsTicketComponent],
    imports: [
        CommonModule,
        DetailsTicketRoutingModule,
        // ReactiveFormsModule,
        // FormsModule,
    ],
  exports: [DetailsTicketComponent]
})
export class DetailsTicketModule {}
