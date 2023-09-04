import { Component, Input, OnInit } from "@angular/core";
import { IQuizCollection } from "../../../core/interfaces/models/quiz";
import { IStyleQuiz } from "../../../core/interfaces/result-quiz.interfaces";
import { IQuiz, IQuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { AppService } from "../../../app.service";
import { Store } from "@ngxs/store";
import { QuizService } from "../../../core/services/http/quiz.service";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { HttpError } from "../../../core/interfaces";
import { QuizError } from "../../../core/enums/errors/quiz.error.enum";
import { ClearQuiz, SaveQuiz } from "../../../core/store/quiz/quiz.action";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-quiz",
    templateUrl: "./admin-quiz.component.html",
    styleUrls: ["./admin-quiz.component.scss"],
})
export class AdminQuizComponent implements OnInit {
    @Input() quizType!: QuizType;

    quizCollection?: IQuizCollection<IStyleQuiz>;

    get quizzes(): IQuiz<IQuizChoice>[] {
        return this.quizCollection?.quizzes ?? [];
    }

    set quizzes(quizzes: IQuiz<IQuizChoice>[]) {
        if (this.quizCollection) {
            this.quizCollection.quizzes = quizzes as IStyleQuiz[];
        } else {
            this.quizCollection = {
                type: this.quizType,
                quizzes: quizzes as IStyleQuiz[],
            } as IQuizCollection<IStyleQuiz>;
        }
    }

    loading = false;

    error = false;

    saving = false;

    submitted = false;

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        this.localQuizCollection();
    }

    localQuizCollection(): void {
        this.getQuizCollection();
    }

    getQuizCollection(): void {
        this.loading = true;
        this.error = false;
        const localCollection = this.store.selectSnapshot(QuizState.getQuiz)(
            this.quizType,
        ) as IQuizCollection<IStyleQuiz>;
        this.quizService.getQuizCollection<IStyleQuiz>(this.quizType).subscribe({
            next: qc => {
                this.loading = false;
                if (localCollection) {
                    this.submitted = false;
                    this.quizCollection = localCollection;
                } else {
                    this.submitted = true;
                    this.quizCollection = qc;
                }
            },
            error: (err: HttpError<QuizError>) => {
                this.loading = false;
                if (err.error?.code !== QuizError.QUIZ_404_TYPE) {
                    this.error = true;
                    this.app.error(err.error?.message || "Failed to load Questions!");
                } else if (localCollection) {
                    this.submitted = false;
                    this.quizCollection = localCollection;
                }
            },
        });
    }

    onQuizAdd(): void {
        setTimeout(() => {
            this.app.scrollToBottom();
        }, 100);
    }

    onQuizChange(): void {
        this.submitted = false;
        this.store.dispatch(new SaveQuiz(this.quizCollection!));
    }

    saveQuizzes(): void {
        this.saving = true;
        this.quizService.saveQuizCollection<IStyleQuiz>(this.quizType, this.quizCollection!.quizzes).subscribe({
            next: qc => {
                this.saving = false;
                this.quizCollection = qc;
                this.store.dispatch(new ClearQuiz(this.quizType));
                this.submitted = true;
                this.app.success("Quiz saved successfully!");
            },
            error: (err: HttpError) => {
                this.saving = false;
                this.app.error(err.error?.message || "Failed to save Questions!");
            },
        });
    }

    refresh(): void {
        this.getQuizCollection();
    }
}
