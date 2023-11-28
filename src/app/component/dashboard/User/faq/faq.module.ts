import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FaqComponent } from "./faq.component";
import { FaqRouterModule } from "./faq.router.module";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [ FaqComponent ],
  imports: [
    CommonModule,
    FaqRouterModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ]
})

export class FaqModule {}
