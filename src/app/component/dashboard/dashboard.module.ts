import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations : [ DashboardComponent ],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule
  ]
})

export class DashboardModule {}
