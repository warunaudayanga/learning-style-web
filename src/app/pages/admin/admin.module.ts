import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../core/modules/shared/shared.module";

@NgModule({
    declarations: [AdminHomeComponent],
    imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
