import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTicketComponent } from "./create-ticket.component";
import { CreateTicektRoutingModule } from "./create-ticekt.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchPipe } from "../../../pipes/search.pipe";
import { NgxPaginationModule } from "ngx-pagination";

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
  ],
  exports: [CreateTicketComponent]
})

export class CreateTicketModule {}
