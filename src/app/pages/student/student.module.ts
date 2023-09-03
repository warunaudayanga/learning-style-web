import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentStyleQuizComponent } from "./student-style-quiz/student-style-quiz.component";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { LayoutModule } from "../../layout/layout.module";
import { StudentStyleResultComponent } from "./student-style-result/student-style-result.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";

@NgModule({
    declarations: [StudentStyleQuizComponent, StudentStyleResultComponent],
    imports: [CommonModule, StudentRoutingModule, SharedModule, LayoutModule, ProgressbarModule],
})
export class StudentModule {}
