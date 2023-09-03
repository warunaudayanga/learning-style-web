import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { LoadQuiz } from "./core/store/quiz/quiz.action";
import { QuizType } from "./core/enums/quiz-type.eum";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    constructor(private readonly store: Store) {
        this.store.dispatch(new LoadQuiz(QuizType.STYLE));
    }
}
