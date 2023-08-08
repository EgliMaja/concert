import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsTicketComponent } from "./details-ticket.component";
import { DetailsTicketRoutingModule } from "./details-ticket-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
@NgModule({
  declarations: [DetailsTicketComponent],
    imports: [
        CommonModule,
        DetailsTicketRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
    ],
})
export class DetailsTicketModule {}
