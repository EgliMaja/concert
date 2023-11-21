import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { CanActivateRoleGuard } from "../../guard/can-activate-role.guard";
import { ERoles } from "../../model/userData.model";

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
        loadChildren: () => import('./manage-concert-tickets/main/main-page/main-page.module').then((m)=> m.MainPageModule),
        canActivate: [CanActivateRoleGuard],
      },
      {
        path: 'ticket/:barcode',
        loadChildren: () => import('./manage-concert-tickets/main/main-page/details-ticket/details-ticket.module').then((m) => m.DetailsTicketModule),
      },
      {
        path: 'my-area/:id',
        loadChildren: ()=> import('./User/user-profile-settings/user-profile-settings.module').then((m)=> m.UserProfileSettingsModule)
      },
      {
        path:'tour-list',
        loadChildren: ()=> import('./User/tour-list/tour-list.module').then((m)=>m.TourListModule) ,
        canActivate: [CanActivateRoleGuard],
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
