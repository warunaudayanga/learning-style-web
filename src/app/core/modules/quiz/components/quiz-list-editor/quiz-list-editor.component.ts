import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IQuiz, IQuizChoice } from "../../../../interfaces/quiz.interfaces";
import { v4 as uuid } from "uuid";
import { DialogService } from "../../../dialog";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-list-editor",
    templateUrl: "./quiz-list-editor.component.html",
    styleUrls: ["./quiz-list-editor.component.scss"],
})
export class QuizListEditorComponent {
    @Input() quizzes: IQuiz<IQuizChoice>[] = [];

    @Output() quizAdd: EventEmitter<IQuiz<IQuizChoice>> = new EventEmitter<IQuiz<IQuizChoice>>();

    @Output() quizRemove: EventEmitter<IQuiz<IQuizChoice>> = new EventEmitter<IQuiz<IQuizChoice>>();

    @Output() quizzesChange: EventEmitter<IQuiz<IQuizChoice>[]> = new EventEmitter<IQuiz<IQuizChoice>[]>();

    constructor(private readonly dialogService: DialogService) {}

    onQuizAdd(): void {
        const quiz: IQuiz<IQuizChoice> = {
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

    onQuizRemove(quiz: IQuiz<IQuizChoice>): void {
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
