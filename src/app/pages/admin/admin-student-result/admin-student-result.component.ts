import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { UserService } from "../../../core/services/http/user.service";
import { AppService } from "../../../app.service";
import { User } from "../../../core/interfaces/models";
import { QuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { SelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { SelfRatingQuizResultDto } from "../../../core/utils/self-rating-quiz-result.dto";
import { toFirstCase } from "@hichchi/utils";
import { DoneICT } from "../../../core/enums/done-ict.enum";
import { Quiz, QuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { SectionComponent } from "../../../layout/shared/section/section.component";
import { SelfRatingAnalysisComponent } from "../../../core/modules/shared/components/self-rating-analysis/self-rating-analysis.component";
import { AfterLessonFeedbackComponent } from "../../../core/modules/shared/components/after-lesson-feedback/after-lesson-feedback.component";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";
import { HttpError } from "@hichchi/ngx-utils";

@Component({
    selector: "app-admin-student-result",
    templateUrl: "./admin-student-result.component.html",
    styleUrls: ["./admin-student-result.component.scss"],
    imports: [
        NgSwitchCase,
        NgSwitchCase,
        NgSwitchCase,
        NgIf,
        NgIf,
        NgIf,
        NgIf,
        SectionComponent,
        SectionComponent,
        NgIf,
        NgIf,
        SelfRatingAnalysisComponent,
        AfterLessonFeedbackComponent,
        SectionComponent,
        SelfRatingAnalysisComponent,
        RouterLink,
        SectionComponent,
        SectionComponent,
        AfterLessonFeedbackComponent,
        SectionHeadingDirective,
        NgSwitch,
    ],
})
export class AdminStudentResultComponent implements OnInit {
    studentId?: string;

    student?: User;

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
    ) {
        this.studentId = this.route.snapshot.params["id"];
    }

    ngOnInit(): void {
        this.getStudent();
    }

    getStudent(): void {
        this.loading = true;
        this.error = false;
        this.userService.getStudentById(this.studentId!).subscribe({
            next: student => {
                this.loading = false;
                this.student = student;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    getResult(answers?: QuizUserAnswers<SelfRatingQuiz>[]): SelfRatingQuizResultDto | undefined {
        const answer = answers?.find(answer => answer.quizCollection?.type === QuizType.SELF_RATING);
        return answer ? new SelfRatingQuizResultDto(answer.result) : undefined;
    }

    getAfterLectureResult(
        answers?: QuizUserAnswers<Quiz<QuizChoice>>[],
    ): QuizUserAnswers<Quiz<QuizChoice>> | undefined {
        const answer = answers?.find(answer => answer.quizCollection?.type === QuizType.AFTER_LECTURE);
        return answer ? answer : undefined;
    }

    refresh(): void {
        this.getStudent();
    }

    protected readonly toFirstCase = toFirstCase;

    protected readonly DoneICT = DoneICT;
}
