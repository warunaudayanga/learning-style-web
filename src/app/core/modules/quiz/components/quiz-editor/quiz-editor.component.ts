import { Component, EventEmitter, Input, Output } from "@angular/core";
import { v4 as uuid } from "uuid";
import { IQuiz, IQuizChoice } from "../../../../interfaces/quiz.interfaces";
import { mapChoiceId } from "../../../../utils/quiz.utils";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-editor",
    templateUrl: "./quiz-editor.component.html",
    styleUrls: ["./quiz-editor.component.scss"],
})
export class QuizEditorComponent {
    @Input() quiz: IQuiz<IQuizChoice> = {
        id: uuid(),
        question: "",
    };

    @Input() index?: number;

    @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() quizChange: EventEmitter<IQuiz<IQuizChoice>> = new EventEmitter<IQuiz<IQuizChoice>>();

    addChoice(): void {
        this.quiz.choices = [...(this.quiz.choices ?? []), { id: uuid(), value: "" }];
        this.onQuizChange();
    }

    removeChoice(option: IQuizChoice): void {
        this.quiz.choices = this.quiz.choices?.filter(o => o.id !== option.id);
        this.quiz.answer = this.quiz.answer?.filter(a => this.quiz.choices?.map(mapChoiceId)?.includes(a.id!)) ?? [];
        this.onQuizChange();
    }

    onQuizChange(): void {
        this.quizChange.emit(this.quiz);
    }

    answerChange(choice: IQuizChoice): void {
        if (this.quiz.multiple) {
            if (this.quiz.answer?.map(mapChoiceId)?.includes(choice.id)) {
                this.quiz.answer = this.quiz.answer?.filter(a => a !== choice);
            } else {
                this.quiz.answer = [...(this.quiz.answer ?? []), choice];
            }
        } else {
            this.quiz.answer = [choice];
        }
        this.onQuizChange();
    }

    protected readonly mapChoiceId = mapChoiceId;
}
