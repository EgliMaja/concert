import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations : [
    DashboardComponent,
    SidebarMenuComponent,
    NavbarComponent,
    CreateTicketComponent,
  ],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class DashboardModule {}
