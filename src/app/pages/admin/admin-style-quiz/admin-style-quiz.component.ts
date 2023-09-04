import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-style-quiz",
    templateUrl: "./admin-style-quiz.component.html",
    styleUrls: ["./admin-style-quiz.component.scss"],
})
export class AdminStyleQuizComponent {
    protected readonly QuizType = QuizType;
}
