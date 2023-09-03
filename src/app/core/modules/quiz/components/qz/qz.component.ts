import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IQuiz, IQuizChoice } from "../../../../interfaces/quiz.interfaces";
import { mapChoiceId } from "../../../../utils/quiz.utils";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz",
    templateUrl: "./qz.component.html",
    styleUrls: ["./qz.component.scss"],
})
export class QzComponent implements OnChanges {
    @Input() quiz!: IQuiz<IQuizChoice>;

    @Input() answer: IQuizChoice[] = [];

    @Input() readonly = false;

    @Input() assess = false;

    @Output() answerChange: EventEmitter<IQuizChoice[]> = new EventEmitter<IQuizChoice[]>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkedValues?: IQuizChoice[];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["quiz"]) {
            this.quiz = changes["quiz"].currentValue;
        }
        if (changes["answer"]) {
            this.answer = changes["answer"].currentValue;
        }
        this.updateChecked();
    }

    onRadioChange(value: IQuizChoice): void {
        this.answer = [value];
        this.answerChange.emit(this.answer);
    }

    onCheckChange(value: IQuizChoice, checked: boolean): void {
        if (checked) {
            if (this.answer) {
                this.answer.push(value);
            } else {
                this.answer = [value];
            }
        } else {
            this.answer = this.answer?.filter(ans => ans.id !== value.id);
        }
        this.answerChange.emit(this.answer);
    }

    onInputChange(): void {
        this.answerChange.emit(this.answer);
    }

    updateChecked(): void {
        this.checkedValues = this.answer;
    }

    isCorrect(): boolean {
        return Boolean(
            this.answer?.length &&
                this.answer?.length === this.quiz.answer?.length &&
                this.quiz.answer?.every(ans => this.answer.map(mapChoiceId)?.includes(ans.id)),
        );
    }

    protected readonly mapChoiceId = mapChoiceId;
}
