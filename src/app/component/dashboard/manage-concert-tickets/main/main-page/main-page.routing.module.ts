import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { MainPageComponent } from "./main-page.component";

const route : Routes = [
    { path: '' , component : MainPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export  class MainPageRoutingModule {}
