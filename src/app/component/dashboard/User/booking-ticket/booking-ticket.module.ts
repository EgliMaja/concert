import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingTicketComponent } from "./booking-ticket.component";
import { BookingTicketRouterModule } from "./booking-ticket.routing.module";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FillOutTicketModule } from "./fill-out-ticket/fill-out-ticket.module";
import { ConfirmTicketModule } from "./confirm-ticet/confirm-ticket.module";
import { PaymentTicketModule } from "./payment-ticket/payment-ticket.module";

@NgModule({
    declarations: [ BookingTicketComponent ],
    imports: [
        CommonModule,
        BookingTicketRouterModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FillOutTicketModule,
        ConfirmTicketModule,
        PaymentTicketModule,
    ]
})
export class BookingTicketModule {}
