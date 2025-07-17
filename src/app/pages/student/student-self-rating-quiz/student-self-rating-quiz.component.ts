import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { SelfRatingQuizResultDto } from "../../../core/utils/self-rating-quiz-result.dto";
import { QuizCollection } from "../../../core/interfaces/models/quiz";
import { SelfRatingQuiz, SelfRatingQuizResult } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { QuizAnswer } from "../../../core/interfaces/quiz.interfaces";

@Component({
    selector: "app-student-self-rating-quiz",
    templateUrl: "./student-self-rating-quiz.component.html",
    styleUrls: ["./student-self-rating-quiz.component.scss"],
})
export class StudentSelfRatingQuizComponent {
    protected readonly QuizType = QuizType;

    transform(quizCollection: QuizCollection<SelfRatingQuiz>, answers: QuizAnswer[]): SelfRatingQuizResult {
        return new SelfRatingQuizResultDto(quizCollection!, answers).result;
    }
}
