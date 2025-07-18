import { Component, effect, inject } from "@angular/core";
import { QuizType } from "./core/enums/quiz-type.eum";
import { UserRole } from "./core/enums/user-role.enum";
import { AuthState } from "@hichchi/ngx-auth";
import { QuizState } from "./core/store/quiz.state";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
    authState = inject(AuthState);

    quizState = inject(QuizState);

    constructor() {
        effect(() => {
            if (this.authState.role() === UserRole.STUDENT) {
                this.quizState.loadQuiz(QuizType.SELF_RATING);
            }
        });
    }
}
