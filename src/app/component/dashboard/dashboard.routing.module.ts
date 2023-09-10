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
          import('./manage-concert-tickets/main/main-page/main-page.module').then((m)=> m.MainPageModule),
      },
      {
        path: 'ticket/:barcode',
        loadChildren: () =>
          import('./manage-concert-tickets/main/main-page/details-ticket/details-ticket.module').then((m) => m.DetailsTicketModule),
      },
      {
        path: 'my-profile/:id',
        loadChildren: ()=> import('./User/user-profile-settings/user-profile-settings.module').then((m)=> m.UserProfileSettingsModule)
      },
      {
        path: '**',
        loadChildren: () => import('src/app/error/error-page/error-page.module').then((m) => m.ErrorPageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
