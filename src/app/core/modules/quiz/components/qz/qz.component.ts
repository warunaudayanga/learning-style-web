import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Quiz, QuizChoice } from "../../../../interfaces/quiz.interfaces";
import { mapChoiceId } from "../../../../utils/quiz.utils";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz",
    templateUrl: "./qz.component.html",
    styleUrls: ["./qz.component.scss"],
})
export class QzComponent implements OnChanges {
    @Input() quiz!: Quiz<QuizChoice>;

    @Input() answer: QuizChoice[] = [];

    @Input() heading = true;

    @Input() rating?: boolean;

    @Input() readonly = false;

    @Input() assess = false;

    @Output() answerChange: EventEmitter<QuizChoice[]> = new EventEmitter<QuizChoice[]>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    checkedValues?: QuizChoice[];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["quiz"]) {
            this.quiz = changes["quiz"].currentValue;
        }
        if (changes["answer"]) {
            this.answer = changes["answer"].currentValue;
        }
        this.updateChecked();
    }

    onRadioChange(value: QuizChoice): void {
        this.answer = [value];
        this.answerChange.emit(this.answer);
    }

    onCheckChange(value: QuizChoice, checked: boolean): void {
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
