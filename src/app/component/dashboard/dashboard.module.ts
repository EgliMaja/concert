import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { NavbarComponent } from "../navbar/navbar.component";
import { HasRolesDirective } from "../../directives/user-role.directive";
import { HttpClientModule } from "@angular/common/http";
import { ObserversModule } from "@angular/cdk/observers";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SidebarMenuModule } from "./sidebar-menu/sidebar-menu.module";
import { LoadingComponent } from "../loading/loading.component";

@NgModule({
  declarations : [
    DashboardComponent,
    NavbarComponent,
    HasRolesDirective,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ObserversModule,
    MatSidenavModule,
    MatSnackBarModule,
    SidebarMenuModule,
    LoadingComponent,
  ],
  exports: [
    DashboardComponent ,
    NavbarComponent,
    HasRolesDirective,
  ],
})

export class DashboardModule {}
