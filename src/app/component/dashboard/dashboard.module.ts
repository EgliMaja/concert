import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";

@NgModule({
  declarations : [
    DashboardComponent,
    SidebarMenuComponent ],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule
  ]
})

export class DashboardModule {}
