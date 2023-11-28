import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FillOutTicketComponent} from "./fill-out-ticket.component";

@NgModule({
    declarations: [ FillOutTicketComponent ],
    imports: [
        CommonModule,
    ],
    exports:[ FillOutTicketComponent ]
})

export class FillOutTicketModule {}
