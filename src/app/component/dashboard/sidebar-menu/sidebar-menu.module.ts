import { NgModule } from "@angular/core";
import { SidebarMenuDirective } from "../../../directives/sidebar-menu.directive";
import { SidebarMenuComponent } from "./sidebar-menu.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [ SidebarMenuComponent ,SidebarMenuDirective ],
  imports:[ CommonModule ],
  exports: [ SidebarMenuComponent , SidebarMenuDirective ],
})

export class SidebarMenuModule {}
