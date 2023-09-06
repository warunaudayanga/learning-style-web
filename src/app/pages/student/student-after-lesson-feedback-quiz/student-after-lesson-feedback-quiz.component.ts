import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-student-after-lesson-feedback-quiz",
    templateUrl: "./student-after-lesson-feedback-quiz.component.html",
    styleUrls: ["./student-after-lesson-feedback-quiz.component.scss"],
})
export class StudentAfterLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
