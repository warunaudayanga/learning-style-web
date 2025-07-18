import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { StudentQuizComponent } from "../student-quiz/student-quiz.component";

@Component({
    selector: "app-student-after-lesson-feedback-quiz",
    templateUrl: "./student-after-lesson-feedback-quiz.component.html",
    styleUrls: ["./student-after-lesson-feedback-quiz.component.scss"],
    standalone: true,
    imports: [StudentQuizComponent],
})
export class StudentAfterLessonFeedbackQuizComponent {
    protected readonly QuizType = QuizType;
}
