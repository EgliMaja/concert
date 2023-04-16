import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { NavbarComponent } from "../navbar/navbar.component";

@NgModule({
  declarations : [
    DashboardComponent,
    SidebarMenuComponent,
    NavbarComponent],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule
  ]
})

export class DashboardModule {}
