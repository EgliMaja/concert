import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './component/add/add.component';
import { NavbarComponent } from './component/dashboard/navbar.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewadminComponent } from './component/viewadmin/viewadmin.component';

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
    path: 'rihanna',
    loadChildren: ()=> import('src/app/component/dashboard/navbar.module').then((m)=> m.NavbarHomeModule )
  },
  {path:'viewadmin',component:ViewadminComponent},
  { path:'add',component:AddComponent},
  {path:'edit/update/:dataid',component:EditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
