import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { AdminSelfRatingQuizComponent } from "./self-rating-quiz/admin-self-rating-quiz.component";
import { LayoutModule } from "../../layout/layout.module";
import { AdminQuizComponent } from "./admin-quiz/admin-quiz.component";
import { AdminBeforeLessonFeedbackQuizComponent } from "./admin-before-lesson-feedback-quiz/admin-before-lesson-feedback-quiz.component";
import { AdminAfterLessonFeedbackQuizComponent } from "./admin-after-lesson-feedback-quiz/admin-after-lesson-feedback-quiz.component";

@NgModule({
    declarations: [
        AdminQuizComponent,
        AdminSelfRatingQuizComponent,
        AdminBeforeLessonFeedbackQuizComponent,
        AdminAfterLessonFeedbackQuizComponent,
    ],
    imports: [CommonModule, AdminRoutingModule, SharedModule, LayoutModule],
})
export class AdminModule {}
