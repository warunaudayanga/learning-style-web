import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Quiz, QuizChoice, QuizChoiceExtenders } from "../../../../interfaces/quiz.interfaces";
import { v4 as uuid } from "uuid";
import { DialogService } from "../../../dialog";
import { NgForOf, NgIf } from "@angular/common";
import { QuizEditorComponent } from "../quiz-editor/quiz-editor.component";
import { NgButtonComponent } from "../../../ng-control/components/ng-button/ng-button.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-list-editor",
    templateUrl: "./quiz-list-editor.component.html",
    styleUrls: ["./quiz-list-editor.component.scss"],
    imports: [
        NgIf,
        QuizEditorComponent,
        NgButtonComponent,
        QuizEditorComponent,
        NgForOf,
        NgButtonComponent,
        NgButtonComponent,
    ],
})
export class QuizListEditorComponent {
    @Input() quizzes: Quiz<QuizChoice>[] = [];

    @Input() rating?: number;

    @Input() extenders?: QuizChoiceExtenders;

    @Output() quizAdd: EventEmitter<Quiz<QuizChoice>> = new EventEmitter<Quiz<QuizChoice>>();

    @Output() quizRemove: EventEmitter<Quiz<QuizChoice>> = new EventEmitter<Quiz<QuizChoice>>();

    @Output() quizzesChange: EventEmitter<Quiz<QuizChoice>[]> = new EventEmitter<Quiz<QuizChoice>[]>();

    constructor(private readonly dialogService: DialogService) {}

    onQuizAdd(): void {
        const quiz: Quiz<QuizChoice> = {
            id: uuid(),
            question: "",
            multiple: false,
            options: [
                { id: uuid(), value: "" },
                { id: uuid(), value: "" },
            ],
        };
        this.quizzes = [...(this.quizzes ?? []), quiz];
        this.quizAdd.emit(quiz);
        this.quizzesChange.emit(this.quizzes);
    }

    onQuizRemove(quiz: Quiz<QuizChoice>): void {
        this.dialogService
            .confirm("Are you sure you want to remove this question?", { ok: "Remove" })
            .subscribe(confirmation => {
                if (confirmation) {
                    this.quizzes = this.quizzes?.filter(q => q !== quiz);
                    this.quizRemove.emit(quiz);
                    this.quizzesChange.emit(this.quizzes);
                }
            });
    }

    onQuizChange(): void {
        this.quizzesChange.emit(this.quizzes);
    }
}
