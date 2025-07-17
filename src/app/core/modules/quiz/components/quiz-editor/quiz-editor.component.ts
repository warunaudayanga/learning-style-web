/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { v4 as uuid } from "uuid";
import { Quiz, QuizChoice, QuizChoiceExtender, QuizChoiceExtenders } from "../../../../interfaces/quiz.interfaces";
import { mapChoiceId } from "../../../../utils/quiz.utils";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-editor",
    templateUrl: "./quiz-editor.component.html",
    styleUrls: ["./quiz-editor.component.scss"],
})
export class QuizEditorComponent implements OnInit {
    @Input() quiz: Quiz<QuizChoice> = {
        id: uuid(),
        question: "",
    };

    @Input() rating?: number;

    @Input() index?: number;

    @Input() extenders?: QuizChoiceExtenders;

    @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() quizChange: EventEmitter<Quiz<QuizChoice>> = new EventEmitter<Quiz<QuizChoice>>();

    selectedExtenders: (QuizChoiceExtender<any> | QuizChoiceExtender<any>[] | null)[] = [];

    ngOnInit(): void {
        if (this.extenders?.items?.length) {
            this.quiz.choices?.forEach((choice, index) => {
                this.selectedExtenders[index] =
                    this.extenders?.items.find(extender => {
                        return extender.extend[this.extenders!.key] === choice[this.extenders!.key as any];
                    }) ?? null;
            });
        }
        if (this.rating) {
            this.quiz.choices = Array.from({ length: this.rating }).map((_v, i) => ({
                id: uuid(),
                value: `${i + 1}`,
            }));
        }
    }

    addChoice(): void {
        if (this.extenders?.items?.length) {
            this.selectedExtenders.push(this.extenders.items[0]);
        }
        this.quiz.choices = [...(this.quiz.choices ?? []), { id: uuid(), value: "" }];
        this.onQuizChange();
    }

    removeChoice(option: QuizChoice): void {
        this.quiz.choices = this.quiz.choices?.filter(o => o.id !== option.id);
        this.quiz.answer = this.quiz.answer?.filter(a => this.quiz.choices?.map(mapChoiceId)?.includes(a.id!)) ?? [];
        this.onQuizChange();
    }

    onQuizChange(): void {
        if (this.extenders?.items?.length) {
            if (this.quiz.choices?.length) {
                for (let i = 0; i < this.quiz.choices!.length; i++) {
                    for (const key of Object.keys(this.selectedExtenders[i] as QuizChoiceExtender<any>)) {
                        this.quiz.choices![i][key] = (this.selectedExtenders[i] as QuizChoiceExtender<any>).extend[key];
                    }
                }
            }
        }
        this.quizChange.emit(this.quiz);
    }

    answerChange(choice: QuizChoice): void {
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
