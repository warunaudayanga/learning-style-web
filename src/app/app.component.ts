import { Component } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { LoadQuiz } from "./core/store/quiz/quiz.action";
import { QuizType } from "./core/enums/quiz-type.eum";
import { AuthState } from "./core/store/auth/auth.state";
import { Observable, Subscription } from "rxjs";
import { UserRole } from "./core/enums/user-role.enum";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    @Select(AuthState.role) role$!: Observable<UserRole | undefined>;

    userSub?: Subscription;

    role?: UserRole;

    constructor(private readonly store: Store) {
        this.userSub = this.role$.subscribe(role => {
            this.role = role;
            this.loadFromState();
        });
        this.role = this.store.selectSnapshot(AuthState.role);
        this.loadFromState();
    }

    loadFromState(): void {
        if (this.role === UserRole.STUDENT) {
            this.store.dispatch(new LoadQuiz(QuizType.SELF_RATING));
        }
    }
}
