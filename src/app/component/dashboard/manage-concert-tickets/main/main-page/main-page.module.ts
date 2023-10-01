import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageComponent } from "./main-page.component";
import { CreateTicketModule } from "./create-ticket/create-ticket.module";
import { TicketListModule } from "./ticket-list/ticket-list.module";
import { MainPageRoutingModule } from "./main-page.routing.module";

@NgModule({
    declarations: [ MainPageComponent ],
    imports : [
        CommonModule,
        MainPageRoutingModule,
        CreateTicketModule,
        TicketListModule,
    ],
})

export class MainPageModule {}
