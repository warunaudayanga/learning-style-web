import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { AdminQuizComponent } from "../admin-quiz/admin-quiz.component";

@Component({
    selector: "app-admin-after-lesson-feedback-quiz",
    templateUrl: "./admin-after-lesson-feedback-quiz.component.html",
    styleUrls: ["./admin-after-lesson-feedback-quiz.component.scss"],
    imports: [AdminQuizComponent, AdminQuizComponent],
})
export class AdminAfterLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
