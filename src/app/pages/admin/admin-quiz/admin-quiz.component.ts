import { Component, inject, Input, OnInit } from "@angular/core";
import { QuizCollection } from "../../../core/interfaces/models/quiz";
import { SelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { Quiz, QuizChoice, QuizChoiceExtenders } from "../../../core/interfaces/quiz.interfaces";
import { AppService } from "../../../app.service";
import { QuizService } from "../../../core/services/http/quiz.service";
import { QuizError } from "../../../core/enums/errors/quiz.error.enum";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { QuizState } from "../../../core/store/quiz.state";
import { SectionComponent } from "../../../layout/shared/section/section.component";
import { QuizListEditorComponent } from "../../../core/modules/quiz/components/quiz-list-editor/quiz-list-editor.component";
import { NgButtonComponent } from "../../../core/modules/ng-control/components/ng-button/ng-button.component";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";
import { NgIf } from "@angular/common";
import { HttpError } from "@hichchi/ngx-utils";

@Component({
    selector: "app-admin-quiz",
    templateUrl: "./admin-quiz.component.html",
    styleUrls: ["./admin-quiz.component.scss"],
    standalone: true,
    imports: [SectionComponent, QuizListEditorComponent, NgButtonComponent, SectionHeadingDirective, NgIf],
})
export class AdminQuizComponent implements OnInit {
    quizState = inject(QuizState);

    @Input() quizType!: QuizType;

    @Input() title!: string;

    @Input() extenders?: QuizChoiceExtenders;

    @Input() rating?: number;

    quizCollection?: QuizCollection<SelfRatingQuiz>;

    get quizzes(): Quiz<QuizChoice>[] {
        return this.quizCollection?.quizzes ?? [];
    }

    set quizzes(quizzes: Quiz<QuizChoice>[]) {
        if (this.quizCollection) {
            this.quizCollection.quizzes = quizzes as SelfRatingQuiz[];
        } else {
            this.quizCollection = {
                type: this.quizType,
                quizzes: quizzes as SelfRatingQuiz[],
            } as QuizCollection<SelfRatingQuiz>;
        }
    }

    loading = false;

    error = false;

    saving = false;

    submitted = false;

    constructor(
        private readonly app: AppService,
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
        const localCollection: QuizCollection<SelfRatingQuiz> = this.quizState.getQuiz(
            this.quizType,
        ) as QuizCollection<SelfRatingQuiz>;

        this.quizService.getQuizCollection<SelfRatingQuiz>(this.quizType).subscribe({
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
            error: (err: HttpError) => {
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
        this.quizState.saveQuiz(this.quizCollection!);
    }

    saveQuizzes(): void {
        this.saving = true;
        this.quizService.saveQuizCollection<SelfRatingQuiz>(this.quizType, this.quizCollection!.quizzes).subscribe({
            next: qc => {
                this.saving = false;
                this.quizCollection = qc;
                this.quizState.clearQuiz(this.quizType);
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
