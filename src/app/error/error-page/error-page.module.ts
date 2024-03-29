import { NgModule } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ErrorPageComponent } from "./error-page.component";
import { ErrorPageRoutingModule } from "./error-page.routing.module";

@NgModule({
    declarations: [ErrorPageComponent],
    imports: [
        CommonModule,
        ErrorPageRoutingModule,
        NgOptimizedImage
    ]
})

export class ErrorPageModule {}
