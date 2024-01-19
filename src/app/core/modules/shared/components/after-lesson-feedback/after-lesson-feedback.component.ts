import { AfterViewInit, Component, Input } from "@angular/core";
import { toFirstCase, toTitleCase } from "hichchi-utils";
import { QuizType } from "src/app/core/enums/quiz-type.eum";
import { IQuizUserAnswers } from "../../../../interfaces/models/quiz";
import { IQuiz, IQuizChoice } from "../../../../interfaces/quiz.interfaces";
import { Agreement } from "../../../../enums/agreement.enum";

@Component({
    selector: "app-after-lesson-feedback",
    templateUrl: "./after-lesson-feedback.component.html",
    styleUrls: ["./after-lesson-feedback.component.scss"],
})
export class AfterLessonFeedbackComponent {
    @Input() result?: IQuizUserAnswers<IQuiz<IQuizChoice>>;

    loading = false;

    error = false;

    getAnswer(quizId: string): string {
        const quiz = this.result?.answers.find(answer => answer.id === quizId);
        return quiz?.answer[0].value
            ? `${toTitleCase(Agreement[Number(quiz?.answer[0].value)])} (${quiz?.answer[0].value})`
            : "";
    }

    protected readonly QuizType = QuizType;

    protected readonly toFirstCase = toFirstCase;
}
