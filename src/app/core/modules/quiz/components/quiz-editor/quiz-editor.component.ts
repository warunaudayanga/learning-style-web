import { Component, EventEmitter, Input, Output } from "@angular/core";
import { v4 as uuid } from "uuid";
import { IQuizChoice, IQuizDraft } from "../../../../interfaces/quiz.interfaces";
import { mapChoiceId } from "../../../../utils/quiz.utils";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-editor",
    templateUrl: "./quiz-editor.component.html",
    styleUrls: ["./quiz-editor.component.scss"],
})
export class QuizEditorComponent {
    @Input() quizDraft: IQuizDraft = { id: uuid() };

    @Input() index?: number;

    @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() quizDraftChange: EventEmitter<IQuizDraft> = new EventEmitter<IQuizDraft>();

    answerTypeChange(choice: boolean, multiple?: boolean): void {
        this.quizDraft.choice = choice;
        this.quizDraft.multiple = Boolean(multiple);
        this.quizChange();
        if (!multiple) {
            this.quizDraft.answer = [];
        }
    }

    addChoice(): void {
        this.quizDraft.choices = [...(this.quizDraft.choices ?? []), { id: uuid(), value: "" }];
        this.quizChange();
    }

    removeChoice(option: { id: string; value: string }): void {
        this.quizDraft.choices = this.quizDraft.choices?.filter(o => o.id !== option.id);
        this.quizDraft.answer =
            this.quizDraft.answer?.filter(a => this.quizDraft.choices?.map(mapChoiceId)?.includes(a.id!)) ?? [];
        this.quizChange();
    }

    quizChange(): void {
        this.quizDraftChange.emit(this.quizDraft);
    }

    answerChange(choice: IQuizChoice): void {
        if (this.quizDraft.multiple) {
            if (this.quizDraft.answer?.map(mapChoiceId)?.includes(choice.id)) {
                this.quizDraft.answer = this.quizDraft.answer?.filter(a => a !== choice);
            } else {
                this.quizDraft.answer = [...(this.quizDraft.answer ?? []), choice];
            }
        } else {
            this.quizDraft.answer = [choice];
        }
        this.quizChange();
    }

    protected readonly mapChoiceId = mapChoiceId;
}
