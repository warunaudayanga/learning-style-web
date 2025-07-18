import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { AdminQuizComponent } from "../admin-quiz/admin-quiz.component";

@Component({
    selector: "app-admin-before-lesson-feedback-quiz",
    templateUrl: "./admin-before-lesson-feedback-quiz.component.html",
    styleUrls: ["./admin-before-lesson-feedback-quiz.component.scss"],
    imports: [AdminQuizComponent],
})
export class AdminBeforeLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
