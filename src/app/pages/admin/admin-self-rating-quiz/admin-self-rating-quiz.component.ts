import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { QuizChoiceExtenders } from "../../../core/interfaces/quiz.interfaces";
import { ISelfRatingQuizChoiceExtendData } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { StyleCategory } from "../../../core/enums/style-category.enum";
import { toFirstCase } from "@hichchi/utils";
import { AdminQuizComponent } from "../admin-quiz/admin-quiz.component";

@Component({
    selector: "app-admin-self-rating-quiz",
    templateUrl: "./admin-self-rating-quiz.component.html",
    styleUrls: ["./admin-self-rating-quiz.component.scss"],
    imports: [AdminQuizComponent, AdminQuizComponent, AdminQuizComponent],
})
export class AdminSelfRatingQuizComponent {
    extenders: QuizChoiceExtenders<ISelfRatingQuizChoiceExtendData> = {
        key: "category",
        width: "130px",
        items: Object.entries(StyleCategory).map(([key, value]) => ({
            label: toFirstCase(key),
            extend: { category: value, me: "yo" },
        })),
    };

    protected readonly QuizType = QuizType;
}
