import { Component } from "@angular/core";
import { Quiz, QuizAnswer } from "../../../core/interfaces/quiz.interfaces";
import { Globals } from "../../../core/config/globals";
import { SaveQuizAnswers } from "../../../core/store/quiz/quiz.action";
import { Store } from "@ngxs/store";
import { QuizState } from "../../../core/store/quiz/quiz.state";

@Component({
    selector: "app-student-quiz",
    templateUrl: "./student-quiz.component.html",
    styleUrls: ["./student-quiz.component.scss"],
})
export class StudentQuizComponent {
    quizzes: Quiz[] = Globals.SAMPLE_QUIZ_LIST_STATIC_IDS;

    answers: QuizAnswer[] = [];

    assessmentId = 1;

    constructor(public readonly store: Store) {
        this.answers = this.store.selectSnapshot(QuizState.getQuizAnswerList)(this.assessmentId)?.answers ?? [];
    }

    onAnswersChange(): void {
        this.store.dispatch(new SaveQuizAnswers({ assessmentId: this.assessmentId, answers: this.answers }));
    }
}
