import { Component, OnInit } from "@angular/core";
import { IQuiz, IQuizAnswer, IQuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { SaveQuizAnswers, SaveQuizAnswersDraft } from "../../../core/store/quiz/quiz.action";
import { Store } from "@ngxs/store";
import { QuizState } from "../../../core/store/quiz/quiz.state";
import { DialogService } from "../../../core/modules/dialog";
import { DialogLevel } from "../../../core/modules/dialog/enums";
import { AppService } from "../../../app.service";
import { QuizService } from "../../../core/services/http/quiz.service";
import { HttpError } from "../../../core/interfaces";
import { IQuizCollection } from "../../../core/interfaces/models/quiz";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { StudentMenu } from "../../../core/enums/menus/student-menu.enum";
import { ISelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";

@Component({
    selector: "app-student-quiz",
    templateUrl: "./student-self-rating-quiz.component.html",
    styleUrls: ["./student-self-rating-quiz.component.scss"],
})
export class StudentSelfRatingQuizComponent implements OnInit {
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
            QuizType.SELF_RATING,
        ) as IQuizCollection<ISelfRatingQuiz>;
        if (this.quizCollection?.quizzes?.length) {
            if (!this.loadAnswers(this.quizCollection)) {
                this.getQuizCollection();
            }
        } else {
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
        this.quizService.getQuizCollection<ISelfRatingQuiz>(QuizType.SELF_RATING).subscribe({
            next: qc => {
                this.quizCollection = qc;
                this.loading = false;
                this.store.dispatch(
                    new SaveQuizAnswersDraft({ quizType: QuizType.SELF_RATING, answers: qc.userAnswers }),
                );
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
            this.answers =
                this.store.selectSnapshot(QuizState.getQuizAnswersDraft)(QuizType.SELF_RATING)?.answers ?? [];
        } else {
            this.answers = qc.userAnswers;
            this.submitted = true;
            this.app.toggleMenu(true, StudentMenu.LEARNING_STYLE_RESULT);
        }
        return Boolean(this.answers);
    }

    onAnswersChange(): void {
        this.store.dispatch(new SaveQuizAnswersDraft({ quizType: QuizType.SELF_RATING, answers: this.answers }));
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
        this.quizService.saveAnswers<ISelfRatingQuiz>(QuizType.SELF_RATING, this.answers, result).subscribe({
            next: answers => {
                this.store.dispatch(new SaveQuizAnswers({ quizType: QuizType.SELF_RATING, answers }));
                this.submitting = false;
                this.submitted = true;
                this.app.scrollToTop();
                this.app.toggleMenu(true, StudentMenu.LEARNING_STYLE_RESULT);
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