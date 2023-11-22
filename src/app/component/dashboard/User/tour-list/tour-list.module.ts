import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TourListRoutingModule } from "./tour-list.routing.module";
import { TourListComponent } from "./tour-list.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgxPaginationModule } from "ngx-pagination";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [ TourListComponent ],
  imports: [
    CommonModule,
    TourListRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
  ]
})

export class TourListModule {}
