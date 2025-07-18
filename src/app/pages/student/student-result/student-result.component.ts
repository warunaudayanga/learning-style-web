import { Component, inject, OnInit } from "@angular/core";
import { SelfRatingQuizResultDto } from "../../../core/utils/self-rating-quiz-result.dto";
import { ProgressbarType } from "ngx-bootstrap/progressbar";
import { AppService } from "../../../app.service";
import { QuizService } from "../../../core/services/http/quiz.service";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { QuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { Quiz, QuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { QuizState } from "../../../core/store/quiz.state";
import { NgIf } from "@angular/common";
import { AfterLessonFeedbackComponent } from "../../../core/modules/shared/components/after-lesson-feedback/after-lesson-feedback.component";
import { SelfRatingAnalysisComponent } from "../../../core/modules/shared/components/self-rating-analysis/self-rating-analysis.component";
import { SectionComponent } from "../../../layout/shared/section/section.component";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";

@Component({
    selector: "app-student-result",
    templateUrl: "./student-result.component.html",
    styleUrls: ["./student-result.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        AfterLessonFeedbackComponent,
        NgIf,
        SelfRatingAnalysisComponent,
        SectionComponent,
        SectionHeadingDirective,
    ],
})
export class StudentResultComponent implements OnInit {
    quizState = inject(QuizState);

    selfRatingQuizResult?: SelfRatingQuizResultDto;

    afterLectureFeedbackResult?: QuizUserAnswers<Quiz<QuizChoice>>;

    loading = false;

    error = false;

    colors: ProgressbarType[] = ["success", "warning", "danger", "info"];

    constructor(
        private readonly app: AppService,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        const selfRatingQuizResult = this.quizState.getQuizAnswers(QuizType.SELF_RATING)?.result;
        if (this.selfRatingQuizResult) {
            this.selfRatingQuizResult = new SelfRatingQuizResultDto(selfRatingQuizResult);
        } else {
            this.getSelfRatingQuizCollection();
        }

        const afterLectureFeedbackResult = this.quizState.getQuizAnswers(QuizType.AFTER_LECTURE)?.result;
        if (this.afterLectureFeedbackResult) {
            this.afterLectureFeedbackResult = afterLectureFeedbackResult;
        } else {
            this.getAfterLectureQuizCollection();
        }
    }

    getSelfRatingQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.SELF_RATING).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.selfRatingQuizResult = new SelfRatingQuizResultDto(quizCollection.result);
            },
            error: () => {
                this.loading = false;
                this.error = true;
            },
        });
    }

    getAfterLectureQuizCollection(): void {
        this.loading = true;
        this.error = false;
        this.quizService.getAnswers(QuizType.AFTER_LECTURE).subscribe({
            next: quizCollection => {
                this.loading = false;
                this.afterLectureFeedbackResult = quizCollection;
            },
            error: () => {
                this.loading = false;
                this.error = true;
            },
        });
    }
}
