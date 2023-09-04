import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentSelfRatingQuizComponent } from "./student-self-rating-quiz/student-self-rating-quiz.component";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { LayoutModule } from "../../layout/layout.module";
import { StudentSelfRatingAnalysisComponent } from "./student-self-rating-analysis/student-self-rating-analysis.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";

@NgModule({
    declarations: [StudentSelfRatingQuizComponent, StudentSelfRatingAnalysisComponent],
    imports: [CommonModule, StudentRoutingModule, SharedModule, LayoutModule, ProgressbarModule],
})
export class StudentModule {}
