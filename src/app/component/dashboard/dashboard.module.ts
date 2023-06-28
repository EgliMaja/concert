import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { SidebarMenuComponent } from "./sidebar-menu/sidebar-menu.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HasRolesDirective} from "../../directives/user-role.directive";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations : [
    DashboardComponent,
    SidebarMenuComponent,
    NavbarComponent,
    HasRolesDirective,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
   ],
})

export class DashboardModule {}
