import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileSettingsComponent } from "./user-profile-settings.component";
import { UserProfileSettingsRouterModule } from "./user-profile-settings.router.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [ UserProfileSettingsComponent ],
    imports: [
        CommonModule,
        UserProfileSettingsRouterModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})

export class UserProfileSettingsModule {}
