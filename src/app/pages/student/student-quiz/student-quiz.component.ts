import { Component, Input, OnInit } from "@angular/core";
import { IQuizCollection } from "../../../core/interfaces/models/quiz";
import { ISelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { IQuiz, IQuizAnswer, IQuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { AppService } from "../../../app.service";
import { Store } from "@ngxs/store";
import { QuizService } from "../../../core/services/http/quiz.service";
import { DialogService } from "../../../core/modules/dialog";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { DialogLevel } from "../../../core/modules/dialog/enums";
import { SaveQuizAnswers, SaveQuizAnswersDraft } from "../../../core/store/quiz/quiz.action";
import { HttpError } from "../../../core/interfaces";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";

@Component({
    selector: "app-student-quiz",
    templateUrl: "./student-quiz.component.html",
    styleUrls: ["./student-quiz.component.scss"],
})
export class StudentQuizComponent implements OnInit {
    @Input() quizType!: QuizType;

    @Input() title?: string;

    @Input() studentId?: string;

    @Input() rating?: boolean;

    @Input() readonly?: boolean;

    quizCollection?: IQuizCollection<ISelfRatingQuiz>;

    get quizzes(): IQuiz<IQuizChoice>[] {
        return this.quizCollection?.quizzes ?? [];
    }

    answers: IQuizAnswer[] = [];

    submitting = false;

    submitted = false;

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        public readonly store: Store,
        private readonly quizService: QuizService,
        private readonly dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.localQuizCollection();
    }

    localQuizCollection(): void {
        this.quizCollection = this.store.selectSnapshot(QuizState.getQuiz)(
            this.quizType,
        ) as IQuizCollection<ISelfRatingQuiz>;
        if (this.studentId || !this.quizCollection?.quizzes?.length || !this.loadAnswers(this.quizCollection)) {
            this.getQuizCollection();
        }

        if (this.quizCollection && !this.answers?.length) {
            this.dialogService.alert({
                title: "Information",
                message: "Please answer the following questionnaire to identify your learning style",
                level: DialogLevel.INFO,
            });
        }
    }

    getQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getQuizCollection<ISelfRatingQuiz>(this.quizType, this.studentId).subscribe({
            next: qc => {
                this.quizCollection = qc;
                this.loading = false;
                // this.store.dispatch(new SaveQuizAnswersDraft({ quizType: this.quizType, answers: qc.userAnswers }));
                this.loadAnswers(qc);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    loadAnswers(qc: IQuizCollection<IQuiz<IQuizChoice>>): boolean {
        if (!qc.userAnswers?.length) {
            this.answers = this.store.selectSnapshot(QuizState.getQuizAnswersDraft)(this.quizType)?.answers ?? [];
        } else {
            this.answers = qc.userAnswers;
            this.submitted = true;
        }
        return Boolean(this.answers.length);
    }

    onAnswersChange(): void {
        this.store.dispatch(new SaveQuizAnswersDraft({ quizType: this.quizType, answers: this.answers }));
    }

    onSubmit(): void {
        if (this.quizCollection && this.quizCollection.quizzes.some(q => !this.answers.map(a => a.id).includes(q.id))) {
            this.dialogService.alert({
                title: "Error",
                message: "Please answer all questions",
                level: DialogLevel.ERROR,
            });
            return;
        }

        this.submitting = true;
        const result = new SelfRatingQuizResult(this.quizCollection!, this.answers).result;
        this.quizService.saveAnswers<ISelfRatingQuiz>(this.quizType, this.answers, result).subscribe({
            next: answers => {
                this.store.dispatch(new SaveQuizAnswers({ quizType: this.quizType, answers }));
                this.submitting = false;
                this.submitted = true;
                this.app.scrollToTop();
            },
            error: (err: HttpError) => {
                this.submitting = false;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    refresh(): void {
        this.getQuizCollection();
    }
}
