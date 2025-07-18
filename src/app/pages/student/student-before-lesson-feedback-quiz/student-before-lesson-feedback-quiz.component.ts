import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { StudentQuizComponent } from "../student-quiz/student-quiz.component";

@Component({
    selector: "app-student-before-lesson-feedback-quiz",
    templateUrl: "./student-before-lesson-feedback-quiz.component.html",
    styleUrls: ["./student-before-lesson-feedback-quiz.component.scss"],
    standalone: true,
    imports: [StudentQuizComponent, StudentQuizComponent, StudentQuizComponent],
})
export class StudentBeforeLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
