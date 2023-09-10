import { NgModule } from "@angular/core";
import { Routes , RouterModule } from "@angular/router";
import { UserProfileSettingsComponent } from "./user-profile-settings.component";

const router : Routes = [
    { path:'' , component: UserProfileSettingsComponent }
]

@NgModule({
    imports:[RouterModule.forChild(router)],
    exports:[RouterModule]
})
export class UserProfileSettingsRouterModule {}
