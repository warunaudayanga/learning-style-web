import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-student-self-rating-quiz",
    templateUrl: "./student-self-rating-quiz.component.html",
    styleUrls: ["./student-self-rating-quiz.component.scss"],
})
export class StudentSelfRatingQuizComponent {
    protected readonly QuizType = QuizType;
}
