import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-self-rating-quiz",
    templateUrl: "./admin-self-rating-quiz.component.html",
    styleUrls: ["./admin-self-rating-quiz.component.scss"],
})
export class AdminSelfRatingQuizComponent {
    protected readonly QuizType = QuizType;
}
