import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { NavbarHomeRoutingModule } from "./navbar.routing.module";

@NgModule({
  declarations : [NavbarComponent],
  imports: [
    CommonModule,
    NavbarHomeRoutingModule
  ]
})

export class NavbarHomeModule {}
