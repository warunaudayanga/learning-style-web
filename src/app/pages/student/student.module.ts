import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentSelfRatingQuizComponent } from "./student-self-rating-quiz/student-self-rating-quiz.component";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { LayoutModule } from "../../layout/layout.module";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { StudentResultComponent } from "./student-result/student-result.component";
import { StudentAfterLessonFeedbackQuizComponent } from "./student-after-lesson-feedback-quiz/student-after-lesson-feedback-quiz.component";
import { StudentBeforeLessonFeedbackQuizComponent } from "./student-before-lesson-feedback-quiz/student-before-lesson-feedback-quiz.component";
import { StudentQuizComponent } from "./student-quiz/student-quiz.component";

@NgModule({
    declarations: [
        StudentSelfRatingQuizComponent,
        StudentResultComponent,
        StudentAfterLessonFeedbackQuizComponent,
        StudentBeforeLessonFeedbackQuizComponent,
        StudentQuizComponent,
    ],
    imports: [CommonModule, StudentRoutingModule, SharedModule, LayoutModule, ProgressbarModule],
    exports: [StudentQuizComponent],
})
export class StudentModule {}
