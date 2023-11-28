import { NgModule } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import { FaqComponent } from "./faq.component";

const route : Routes = [
  { path: '' , component: FaqComponent }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class FaqRouterModule {}
