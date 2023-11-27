import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookingTicketComponent } from "./booking-ticket.component";

const route: Routes = [
    { path: '' , component: BookingTicketComponent }
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class BookingTicketRouterModule {}
