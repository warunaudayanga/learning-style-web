import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { AdminSelfRatingQuizComponent } from "./admin-self-rating-quiz/admin-self-rating-quiz.component";
import { LayoutModule } from "../../layout/layout.module";
import { AdminQuizComponent } from "./admin-quiz/admin-quiz.component";
import { AdminBeforeLessonFeedbackQuizComponent } from "./admin-before-lesson-feedback-quiz/admin-before-lesson-feedback-quiz.component";
import { AdminAfterLessonFeedbackQuizComponent } from "./admin-after-lesson-feedback-quiz/admin-after-lesson-feedback-quiz.component";
import { AdminStudentsComponent } from "./admin-students/admin-students.component";
import { StudentCardComponent } from "./admin-students/student-card/student-card.component";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { AdminStudentResultComponent } from "./admin-student-result/admin-student-result.component";
import { AdminQuizAnswersComponent } from "./admin-quiz-answers/admin-quiz-answers.component";
import { StudentModule } from "../student/student.module";
import { AdminFeedbackAnalysisComponent } from "./admin-after-lesson-feedback-analysis/admin-feedback-analysis.component";
import { NgChartsModule } from "ng2-charts";

@NgModule({
    declarations: [
        AdminQuizComponent,
        AdminSelfRatingQuizComponent,
        AdminBeforeLessonFeedbackQuizComponent,
        AdminAfterLessonFeedbackQuizComponent,
        AdminStudentsComponent,
        StudentCardComponent,
        AdminStudentResultComponent,
        AdminQuizAnswersComponent,
        AdminFeedbackAnalysisComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        LayoutModule,
        ProgressbarModule,
        StudentModule,
        NgChartsModule,
    ],
})
export class AdminModule {}
