import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TicketListComponent } from "./ticket-list.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxPaginationModule } from "ngx-pagination";
import { SearchPipe } from "../../../../../../pipes/search.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        TicketListComponent ,
        SearchPipe,
    ],
    imports:[
        CommonModule,
        MatProgressSpinnerModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports:[
        TicketListComponent
    ]
})

export class TicketListModule {}
