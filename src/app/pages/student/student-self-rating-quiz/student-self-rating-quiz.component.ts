import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";
import { IQuizCollection } from "../../../core/interfaces/models/quiz";
import { ISelfRatingQuiz, ISelfRatingQuizResult } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { IQuizAnswer } from "../../../core/interfaces/quiz.interfaces";

@Component({
    selector: "app-student-self-rating-quiz",
    templateUrl: "./student-self-rating-quiz.component.html",
    styleUrls: ["./student-self-rating-quiz.component.scss"],
})
export class StudentSelfRatingQuizComponent {
    protected readonly QuizType = QuizType;

    transform(quizCollection: IQuizCollection<ISelfRatingQuiz>, answers: IQuizAnswer[]): ISelfRatingQuizResult {
        return new SelfRatingQuizResult(quizCollection!, answers).result;
    }
}
