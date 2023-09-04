import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { QuizService } from "../../../core/services/http/quiz.service";
import { AppService } from "../../../app.service";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";
import { HttpError } from "../../../core/interfaces";

@Component({
    selector: "app-student-self-rating-analysis",
    templateUrl: "./student-self-rating-analysis.component.html",
    styleUrls: ["./student-self-rating-analysis.component.scss"],
})
export class StudentSelfRatingAnalysisComponent implements OnInit {
    result?: SelfRatingQuizResult;

    loading = false;

    error = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        const result = this.store.selectSnapshot(QuizState.getQuizAnswers)(QuizType.SELF_RATING)?.result;
        if (this.result) {
            this.result = new SelfRatingQuizResult(result);
        } else {
            this.getQuizCollection();
        }
    }

    getQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.SELF_RATING).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.result = new SelfRatingQuizResult(quizCollection.result);
            },
            error: (err: HttpError) => {
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    refresh(): void {
        this.getQuizCollection();
    }
}
