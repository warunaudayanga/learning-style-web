import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/http/user.service";
import { IUser } from "../../../core/interfaces/models";
import { AppService } from "../../../app.service";
import { HttpError } from "../../../core/interfaces";
import { IQuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { ISelfRatingQuiz, ISelfRatingQuizResult } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { QuizType } from "../../../core/enums/quiz-type.eum";

@Component({
    selector: "app-admin-students",
    templateUrl: "./admin-students.component.html",
    styleUrls: ["./admin-students.component.scss"],
})
export class AdminStudentsComponent implements OnInit {
    students: IUser[] = [];

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        private readonly userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents(): void {
        this.loading = true;
        this.error = false;
        this.userService.getStudents().subscribe({
            next: students => {
                this.loading = false;
                this.students = students;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    getResult(
        answers?: IQuizUserAnswers<ISelfRatingQuiz>[],
    ): IQuizUserAnswers<ISelfRatingQuiz, ISelfRatingQuizResult> | undefined {
        return answers?.find(answer => answer.quizCollection?.type === QuizType.SELF_RATING);
    }

    refresh(): void {
        this.getStudents();
    }
}