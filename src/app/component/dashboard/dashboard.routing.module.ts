import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: "full", redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () => import('./dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'rihanna',
        loadChildren: () =>
          import('./create-ticket/create-ticket.module').then((m) => m.CreateTicketModule),
      },
      {
        path: 'ticket/:barcode',
        loadChildren: () =>
          import('./details-ticket/details-ticket.module').then((m) => m.DetailsTicketModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('../signin/signin.module').then((m) => m.SigninModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
