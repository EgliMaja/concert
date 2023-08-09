import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateTicketComponent } from "./create-ticket.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ CreateTicketComponent ],
  imports : [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CreateTicketComponent]
})

export class CreateTicketModule {}
