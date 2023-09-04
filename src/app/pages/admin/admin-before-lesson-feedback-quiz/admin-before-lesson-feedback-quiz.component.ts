import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-before-lesson-feedback-quiz",
    templateUrl: "./admin-before-lesson-feedback-quiz.component.html",
    styleUrls: ["./admin-before-lesson-feedback-quiz.component.scss"],
})
export class AdminBeforeLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
