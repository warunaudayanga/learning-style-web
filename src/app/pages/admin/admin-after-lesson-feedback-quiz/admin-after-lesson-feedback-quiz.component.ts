import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-after-lesson-feedback-quiz",
    templateUrl: "./admin-after-lesson-feedback-quiz.component.html",
    styleUrls: ["./admin-after-lesson-feedback-quiz.component.scss"],
})
export class AdminAfterLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
