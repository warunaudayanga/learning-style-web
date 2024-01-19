import { Component, OnInit } from "@angular/core";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { AppService } from "../../../app.service";
import { Store } from "@ngxs/store";
import { QuizService } from "../../../core/services/http/quiz.service";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { HttpError } from "../../../core/interfaces";
import { QuizError } from "../../../core/enums/errors/quiz.error.enum";
import { IQuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { IQuiz, IQuizChoice } from "../../../core/interfaces/quiz.interfaces";

@Component({
    selector: "app-student-result",
    templateUrl: "./student-result.component.html",
    styleUrls: ["./student-result.component.scss"],
})
export class StudentResultComponent implements OnInit {
    selfRatingQuizResult?: SelfRatingQuizResult;

    afterLectureFeedbackResult?: IQuizUserAnswers<IQuiz<IQuizChoice>>;

    loading = false;

    error = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        const selfRatingQuizResult = this.store.selectSnapshot(QuizState.getQuizAnswers)(QuizType.SELF_RATING)?.result;
        if (this.selfRatingQuizResult) {
            this.selfRatingQuizResult = new SelfRatingQuizResult(selfRatingQuizResult);
        } else {
            this.getSelfRatingQuizCollection();
        }

        const afterLectureFeedbackResult = this.store.selectSnapshot(QuizState.getQuizAnswers)(QuizType.AFTER_LECTURE)
            ?.result;
        if (this.afterLectureFeedbackResult) {
            this.afterLectureFeedbackResult = afterLectureFeedbackResult;
        } else {
            this.getAfterLectureQuizCollection();
        }
    }

    getSelfRatingQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.SELF_RATING).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.selfRatingQuizResult = new SelfRatingQuizResult(quizCollection.result);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                if (
                    !(
                        err.error?.code === QuizError.QUIZ_404_TYPE ||
                        err.error?.code === QuizError.QUIZ_ANSWERS_404_CONDITION
                    )
                ) {
                    this.app.error(err.error?.message || "Failed to load Questions!");
                }
            },
        });
    }

    getAfterLectureQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.AFTER_LECTURE).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.afterLectureFeedbackResult = quizCollection;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                if (
                    !(
                        err.error?.code === QuizError.QUIZ_404_TYPE ||
                        err.error?.code === QuizError.QUIZ_ANSWERS_404_CONDITION
                    )
                ) {
                    this.app.error(err.error?.message || "Failed to load Questions!");
                }
            },
        });
    }
}
