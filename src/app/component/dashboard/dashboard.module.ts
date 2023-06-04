import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { MatMenuModule } from '@angular/material/menu';
import { SidebarMenuComponent } from "../sidebar-menu/sidebar-menu.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import {HasRolesDirective} from "../../user-role.directive";
import {SearchPipe} from "../../pipes/search.pipe";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations : [
    DashboardComponent,
    SidebarMenuComponent,
    NavbarComponent,
    CreateTicketComponent,
    HasRolesDirective,
    SearchPipe,
  ],
  imports : [
    CommonModule,
    DashboardRoutingModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    NgxPaginationModule,
  ],
  bootstrap: [CreateTicketComponent]
})

export class DashboardModule {}
