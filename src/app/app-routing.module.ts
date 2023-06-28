import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'signin', pathMatch:'full'},
  {
    path: 'signin',
    loadChildren :()=> import('src/app/component/signin/signin.module').then((m)=> m.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: ()=> import('src/app/component/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren: ()=> import('src/app/component/dashboard/dashboard.module').then((m)=> m.DashboardModule)
  },
  {
    path: '**',
    loadChildren :()=> import('src/app/component/signin/signin.module').then((m)=> m.SigninModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
