import { Component, OnInit } from "@angular/core";
import { IUser } from "../../../core/interfaces/models";
import { AppService } from "../../../app.service";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../../core/services/http/user.service";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { HttpError } from "../../../core/interfaces";
import { toFirstCase } from "hichchi-utils";

@Component({
    selector: "app-admin-quiz-answers",
    templateUrl: "./admin-quiz-answers.component.html",
    styleUrls: ["./admin-quiz-answers.component.scss"],
})
export class AdminQuizAnswersComponent implements OnInit {
    studentId?: string;

    quizType?: QuizType;

    student?: IUser;

    loading = false;

    error = false;

    constructor(
        private app: AppService,
        private readonly route: ActivatedRoute,
        private userService: UserService,
    ) {
        this.studentId = this.route.snapshot.params["id"];
        this.quizType = this.route.snapshot.params["quizType"];
    }

    ngOnInit(): void {
        this.getStudent();
    }

    getStudent(): void {
        this.loading = true;
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

    refresh(): void {
        this.getStudent();
    }

    protected readonly toFirstCase = toFirstCase;
}
