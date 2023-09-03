import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { QuizService } from "../../../core/services/http/quiz.service";
import { AppService } from "../../../app.service";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { StyleQuizResult } from "../../../core/utils/style-quiz-result";
import { HttpError } from "../../../core/interfaces";

@Component({
    selector: "app-student-style-result",
    templateUrl: "./student-style-result.component.html",
    styleUrls: ["./student-style-result.component.scss"],
})
export class StudentStyleResultComponent implements OnInit {
    result?: StyleQuizResult;

    loading = false;

    error = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        const result = this.store.selectSnapshot(QuizState.getQuizAnswers)(QuizType.STYLE)?.result;
        if (this.result) {
            this.result = new StyleQuizResult(result);
        } else {
            this.getQuizCollection();
        }
    }

    getQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.STYLE).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.result = new StyleQuizResult(quizCollection.result);
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
