import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'rihanna',
        loadChildren: () =>
          import('./create-ticket/create-ticket.module').then((m) => m.CreateTicketModule)
      },
      {
        path: 'rihanna/ticket/:barcode',
        loadChildren: () =>
          import('./details-ticket/details-ticket.module').then((m) => m.DetailsTicketModule)
      },
      {
        path: '**',
        loadChildren: () =>
          import('src/app/component/signin/signin.module').then((m) => m.SigninModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
