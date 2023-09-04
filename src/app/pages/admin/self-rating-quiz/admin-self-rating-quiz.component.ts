import { Component } from "@angular/core";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { IQuizChoiceExtenders } from "../../../core/interfaces/quiz.interfaces";
import { ISelfRatingQuizChoiceExtendData } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { StyleCategory } from "../../../core/enums/style-category.enum";
import { toFirstCase } from "hichchi-utils";

@Component({
    selector: "app-admin-self-rating-quiz",
    templateUrl: "./admin-self-rating-quiz.component.html",
    styleUrls: ["./admin-self-rating-quiz.component.scss"],
})
export class AdminSelfRatingQuizComponent {
    extenders: IQuizChoiceExtenders<ISelfRatingQuizChoiceExtendData> = {
        key: "category",
        width: "130px",
        items: Object.entries(StyleCategory).map(([key, value]) => ({
            label: toFirstCase(key),
            extend: { category: value, me: "yo" },
        })),
    };

    protected readonly QuizType = QuizType;
}
