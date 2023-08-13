import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteTicketComponent } from "./delete-ticket.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [ DeleteTicketComponent ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [ DeleteTicketComponent ]
})

export class DeleteTicketModule {}
