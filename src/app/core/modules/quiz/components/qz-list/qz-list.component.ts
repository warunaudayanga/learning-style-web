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
import { Quiz, QuizAnswer, QuizChoice } from "../../../../interfaces/quiz.interfaces";
import { DialogLevel } from "../../../dialog/enums";
import { DialogService } from "../../../dialog";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz-list",
    templateUrl: "./qz-list.component.html",
    styleUrls: ["./qz-list.component.scss"],
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class QzListComponent implements OnInit, OnChanges, AfterContentInit {
    @Input() items?: Quiz<QuizChoice>[] = [];

    @Input() answers: QuizAnswer[] = [];

    @Input() submitted = false;

    @Input() rating?: boolean;

    @Input() heading = true;

    @Input() readonly = false;

    @Input() assess = false;

    @Input() limit?: number;

    @Output() answersChange: EventEmitter<QuizAnswer[]> = new EventEmitter<QuizAnswer[]>();

    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() onSubmit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ContentChildren(QzComponent) qzComponents?: QueryList<QzComponent>;

    page = 1;

    constructor(private readonly dialogService: DialogService) {}

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
                if (this.heading && !qz.heading) {
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

    onAnswerChange(id: string, answer: QuizChoice[]): void {
        const qAns = this.answers.find(ans => ans.id === id);
        if (qAns) {
            qAns.answer = answer;
        } else {
            this.answers.push({ id, answer });
        }
        this.answersChange.emit(this.answers);
    }

    getAnswer(quiz: Quiz<QuizChoice>): QuizChoice[] {
        return this.answers?.find(ans => ans.id === quiz.id)?.answer ?? [];
    }

    isAnswered(): boolean {
        if (
            this.limit &&
            this.items
                ?.slice(this.limit * (this.page - 1), this.limit * this.page)
                .some(q => !this.answers.map(a => a.id).includes(q.id))
        ) {
            this.dialogService.alert({
                title: "Error",
                message: "Please answer all questions",
                level: DialogLevel.ERROR,
            });
            return false;
        }
        return true;
    }

    next(): void {
        if (this.isAnswered()) {
            this.page++;
            this.pageChange.emit(this.page);
        }
    }

    prev(): void {
        if (this.limit) {
            this.page--;
            this.pageChange.emit(this.page);
        }
    }

    submit(e: MouseEvent): void {
        if (this.isAnswered()) {
            this.onSubmit.emit(e);
            this.page = 1;
        }
    }
}
