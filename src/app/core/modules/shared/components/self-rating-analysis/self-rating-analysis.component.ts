import { Component, Input } from "@angular/core";
import { SelfRatingQuizResult } from "../../../../utils/self-rating-quiz-result";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { QuizType } from "../../../../enums/quiz-type.eum";

@Component({
    selector: "app-self-rating-analysis",
    templateUrl: "./self-rating-analysis.component.html",
    styleUrls: ["./self-rating-analysis.component.scss"],
})
export class SelfRatingAnalysisComponent {
    @Input() result?: SelfRatingQuizResult;

    @Input() child = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    protected readonly QuizType = QuizType;
}
