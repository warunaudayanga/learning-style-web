import { Component, input, InputSignal } from "@angular/core";
import { toFirstCase, toTitleCase } from "@hichchi/utils";
import { QuizType } from "src/app/core/enums/quiz-type.eum";
import { QuizUserAnswers } from "../../../../interfaces/models/quiz";
import { Quiz, QuizChoice } from "../../../../interfaces/quiz.interfaces";
import { Agreement } from "../../../../enums/agreement.enum";
import { SectionComponent } from "../../../../../layout/shared/section/section.component";
import { SectionHeadingDirective } from "../../../../directives/section-heading.directive";

@Component({
    selector: "app-after-lesson-feedback",
    templateUrl: "./after-lesson-feedback.component.html",
    styleUrls: ["./after-lesson-feedback.component.scss"],
    imports: [SectionComponent, SectionHeadingDirective],
})
export class AfterLessonFeedbackComponent {
    result: InputSignal<QuizUserAnswers<Quiz<QuizChoice>> | undefined> = input<
        QuizUserAnswers<Quiz<QuizChoice>> | undefined
    >();

    loading = false;

    error = false;

    getAnswer(quizId: string): string {
        const quiz = this.result()?.answers.find(answer => answer.id === quizId);
        return quiz?.answer[0].value
            ? `${toTitleCase(Agreement[Number(quiz?.answer[0].value)])} (${quiz?.answer[0].value})`
            : "";
    }

    protected readonly QuizType = QuizType;

    protected readonly toFirstCase = toFirstCase;
}
