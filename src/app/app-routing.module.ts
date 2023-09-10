import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: "full", redirectTo: 'signin'},
    {
        path: 'signin',
        loadChildren: ()=> import('src/app/component/signin/signin.module').then((m) => m.SigninModule)
    },
    {
        path: 'signup',
        loadChildren: ()=> import('src/app/component/register/register.module').then((m) => m.RegisterModule)
    },
    {
        path: 'home',
        loadChildren: ()=> import('src/app/component/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
    {
        path: '**',
        loadChildren: ()=> import('src/app/error/error-page/error-page.module').then((m) => m.ErrorPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
