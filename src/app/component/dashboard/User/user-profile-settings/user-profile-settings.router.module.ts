import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserProfileSettingsComponent } from "./user-profile-settings.component";

const router: Routes = [
  {
    path: '',
    component: UserProfileSettingsComponent,
    children: [
      { path: '', pathMatch: "full", redirectTo: 'my-area' },
      {
        path: 'my-area/:id',
        loadChildren: () => import('../user-profile-settings/user-profile-settings.module').then((m) => m.UserProfileSettingsModule),
      },
      {
        path: 'my-profile/:id',
        loadChildren: () => import('../user-profile-settings/my-profile/my-profile.module').then((m) => m.MyProfileModule)
      },
      {
        path: 'my-ticket-store/:id',
        loadChildren: () => import('../user-profile-settings/my-ticket-store/my-ticket-store.module').then((m) => m.MyTicketStoreModule)
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class UserProfileSettingsRouterModule {
}
