import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { AdminStyleQuizComponent } from "./admin-style-quiz/admin-style-quiz.component";
import { LayoutModule } from "../../layout/layout.module";
import { AdminQuizComponent } from "./admin-quiz/admin-quiz.component";

@NgModule({
    declarations: [AdminStyleQuizComponent, AdminQuizComponent],
    imports: [CommonModule, AdminRoutingModule, SharedModule, LayoutModule],
})
export class AdminModule {}
