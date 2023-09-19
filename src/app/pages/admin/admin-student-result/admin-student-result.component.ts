import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../core/services/http/user.service";
import { HttpError } from "../../../core/interfaces";
import { AppService } from "../../../app.service";
import { IUser } from "../../../core/interfaces/models";
import { IQuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { ISelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { SelfRatingQuizResult } from "../../../core/utils/self-rating-quiz-result";
import { toFirstCase } from "hichchi-utils";
import { DoneICT } from "../../../core/enums/done-ict.enum";

@Component({
    selector: "app-admin-student-result",
    templateUrl: "./admin-student-result.component.html",
    styleUrls: ["./admin-student-result.component.scss"],
})
export class AdminStudentResultComponent implements OnInit {
    studentId?: string;

    student?: IUser;

    loading = false;

    error = false;

    constructor(
        private app: AppService,
        private readonly route: ActivatedRoute,
        private userService: UserService,
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

    getResult(answers?: IQuizUserAnswers<ISelfRatingQuiz>[]): SelfRatingQuizResult | undefined {
        const answer = answers?.find(answer => answer.quizCollection?.type === QuizType.SELF_RATING);
        return answer ? new SelfRatingQuizResult(answer.result) : undefined;
    }

    refresh(): void {
        this.getStudent();
    }

    protected readonly toFirstCase = toFirstCase;

    protected readonly DoneICT = DoneICT;
}
