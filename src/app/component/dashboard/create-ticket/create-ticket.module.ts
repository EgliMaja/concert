import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTicketComponent } from "./create-ticket.component";
import { CreateTicektRoutingModule } from "./create-ticekt.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "../../../pipes/search.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CreateTicketComponent,
    SearchPipe,
  ],
  imports : [
    CommonModule,
    CreateTicektRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [CreateTicketComponent]
})

export class CreateTicketModule {}
