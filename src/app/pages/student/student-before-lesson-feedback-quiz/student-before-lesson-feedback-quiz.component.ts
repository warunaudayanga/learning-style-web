import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-student-before-lesson-feedback-quiz",
    templateUrl: "./student-before-lesson-feedback-quiz.component.html",
    styleUrls: ["./student-before-lesson-feedback-quiz.component.scss"],
})
export class StudentBeforeLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
