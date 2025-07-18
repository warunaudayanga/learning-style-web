import { Component, inject, Input } from "@angular/core";
import { SelfRatingQuizResultDto } from "../../../../utils/self-rating-quiz-result.dto";
import { ProgressbarComponent, ProgressbarType } from "ngx-bootstrap/progressbar";
import { QuizType } from "../../../../enums/quiz-type.eum";
import { StyleCategory } from "../../../../enums/style-category.enum";
import { UserRole } from "../../../../enums/user-role.enum";
import { SelfRatingQuizResultFinalRecord } from "../../../../interfaces/self-rating-quiz.interfaces";
import { AuthState } from "@hichchi/ngx-auth";
import { SectionComponent } from "../../../../../layout/shared/section/section.component";
import { SectionHeadingDirective } from "../../../../directives/section-heading.directive";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-self-rating-analysis",
    templateUrl: "./self-rating-analysis.component.html",
    styleUrls: ["./self-rating-analysis.component.scss"],
    imports: [SectionComponent, SectionHeadingDirective, NgIf, RouterLink, ProgressbarComponent, NgForOf],
})
export class SelfRatingAnalysisComponent {
    authState = inject(AuthState);

    @Input() result?: SelfRatingQuizResultDto;

    @Input() child = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    who: string;

    protected readonly QuizType = QuizType;

    constructor() {
        this.who = this.authState.roleName() === UserRole.STUDENT ? "You" : "This student";
    }

    getDescription(final: SelfRatingQuizResultFinalRecord): string | undefined {
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
