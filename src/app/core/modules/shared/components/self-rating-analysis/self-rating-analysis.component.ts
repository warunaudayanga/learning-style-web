import { Component, Input } from "@angular/core";
import { SelfRatingQuizResult } from "../../../../utils/self-rating-quiz-result";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { QuizType } from "../../../../enums/quiz-type.eum";
import { StyleCategory } from "../../../../enums/style-category.enum";
import { Store } from "@ngxs/store";
import { AuthState } from "../../../../store/auth/auth.state";
import { UserRole } from "../../../../enums/user-role.enum";

@Component({
    selector: "app-self-rating-analysis",
    templateUrl: "./self-rating-analysis.component.html",
    styleUrls: ["./self-rating-analysis.component.scss"],
})
export class SelfRatingAnalysisComponent {
    @Input() result?: SelfRatingQuizResult;

    @Input() child = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    who: string;

    protected readonly QuizType = QuizType;

    protected readonly StyleCategory = StyleCategory;

    constructor(private readonly store: Store) {
        this.who = this.store.selectSnapshot(AuthState.role) === UserRole.STUDENT ? "You" : "This student";
    }
}
