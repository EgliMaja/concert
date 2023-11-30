import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaymentTicketComponent} from "./payment-ticket.component";

@NgModule({
    declarations: [ PaymentTicketComponent ],
    imports: [
        CommonModule,
    ],
    exports:[ PaymentTicketComponent ]
})

export class PaymentTicketModule {}
