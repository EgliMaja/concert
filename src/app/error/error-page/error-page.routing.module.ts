import { NgModule } from "@angular/core";
import { RouterModule , Routes} from "@angular/router";
import { ErrorPageComponent } from "./error-page.component";

const route: Routes = [
    { path: '' , component: ErrorPageComponent }
]
@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})

export class ErrorPageRoutingModule {}
