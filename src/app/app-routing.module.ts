import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './component/add/add.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewadminComponent } from './component/viewadmin/viewadmin.component';

const routes: Routes = [
  { path:'', redirectTo:'view', pathMatch:'full'},
  {path:'viewadmin',component:ViewadminComponent},
  { path:'add',component:AddComponent},
  {path:'edit/update/:dataid',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
