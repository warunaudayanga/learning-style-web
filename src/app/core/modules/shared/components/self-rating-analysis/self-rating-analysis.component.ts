import { Component, Input } from "@angular/core";
import { SelfRatingQuizResult } from "../../../../utils/self-rating-quiz-result";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { QuizType } from "../../../../enums/quiz-type.eum";
import { StyleCategory } from "../../../../enums/style-category.enum";
import { Store } from "@ngxs/store";
import { AuthState } from "../../../../store/auth/auth.state";
import { UserRole } from "../../../../enums/user-role.enum";
import { ISelfRatingQuizResultFinalRecord } from "../../../../interfaces/self-rating-quiz.interfaces";

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

    getDescription(final: ISelfRatingQuizResultFinalRecord): string | undefined {
        return final.categories
            ?.map(category => {
                switch (category) {
                    case StyleCategory.ACTIVIST:
                        return "prefers to try things out, working with others in groups";
                    case StyleCategory.REFLECTOR:
                        return "prefers thinking things through, working alone or with familiar partner";
                    case StyleCategory.SENSING:
                        return "prefers concrete thinking, practical, concerned with facts and procedures";
                    case StyleCategory.INTUITIVE:
                        return "prefers conceptual thinking, innovative, concerned with theories and meanings";
                    case StyleCategory.VISUAL:
                        return "prefers visual representations, pictures, diagrams, and flow charts";
                    case StyleCategory.VERBAL:
                        return "prefers written and spoken explanations";
                    case StyleCategory.SEQUENTIAL:
                        return "prefers linear thinking, orderly, learns in small incremental steps";
                    case StyleCategory.GLOBAL:
                        return "prefers holistic thinking, systems thinkers, learns in large leaps";
                    default:
                        return "";
                }
            })
            .join(`, and also ${this.who.toLowerCase()} `);
    }
}
