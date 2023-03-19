import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const router : Routes= [
  {path: '' , component : NavbarComponent}
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
})
export class NavbarHomeRoutingModule {}
