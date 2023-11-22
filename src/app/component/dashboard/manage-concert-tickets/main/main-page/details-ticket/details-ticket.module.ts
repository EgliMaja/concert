import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsTicketComponent } from "./details-ticket.component";
import { DetailsTicketRoutingModule } from "./details-ticket-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DeleteTicketModule } from "../delete-ticket/delete-ticket.module";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import {DashboardModule} from "../../../../dashboard.module";
@NgModule({
  declarations: [DetailsTicketComponent],
    imports: [
        CommonModule,
        DetailsTicketRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        DeleteTicketModule,
        MatButtonModule,
        MatDialogModule,
        DashboardModule,
    ],
})
export class DetailsTicketModule {}
