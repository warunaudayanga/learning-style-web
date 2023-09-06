import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
} from "@angular/core";
import { QzComponent } from "../qz/qz.component";
import { IQuiz, IQuizAnswer, IQuizChoice } from "../../../../interfaces/quiz.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz-list",
    templateUrl: "./qz-list.component.html",
    styleUrls: ["./qz-list.component.scss"],
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class QzListComponent implements OnInit, OnChanges, AfterContentInit {
    @Input() items?: IQuiz<IQuizChoice>[] = [];

    @Input() answers: IQuizAnswer[] = [];

    @Input() readonly = false;

    @Input() assess = false;

    @Output() answersChange: EventEmitter<IQuizAnswer[]> = new EventEmitter<IQuizAnswer[]>();

    @ContentChildren(QzComponent) qzComponents?: QueryList<QzComponent>;

    ngOnInit(): void {
        this.answersChange.emit(this.answers);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["answers"]) {
            this.answers = changes["answers"].currentValue;
        }
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
            this.items?.forEach((qz, i) => {
                if (!qz.heading) {
                    qz.heading = `Question ${i + 1}`;
                }
                if (qz.answer?.length === 0) {
                    qz.answer = [];
                }
            });
        }
    }

    ngAfterContentInit(): void {
        this.qzComponents?.forEach((qz, i) => {
            if (qz.quiz && !qz.quiz?.heading) {
                qz.quiz.heading = `Question ${i + 1}`;
            }
            if (qz.answer?.length === 0) {
                qz.answer = [];
            }
        });
    }

    onAnswerChange(id: string, answer: IQuizChoice[]): void {
        const qAns = this.answers.find(ans => ans.id === id);
        if (qAns) {
            qAns.answer = answer;
        } else {
            this.answers.push({ id, answer });
        }
        this.answersChange.emit(this.answers);
    }

    getAnswer(quiz: IQuiz<IQuizChoice>): IQuizChoice[] {
        return this.answers?.find(ans => ans.id === quiz.id)?.answer ?? [];
    }
}
