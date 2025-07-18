import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/interfaces/models";
import { AppService } from "../../../app.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { UserService } from "../../../core/services/http/user.service";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { toFirstCase } from "@hichchi/utils";
import { NgIf } from "@angular/common";
import { StudentQuizComponent } from "../../student/student-quiz/student-quiz.component";
import { SectionComponent } from "../../../layout/shared/section/section.component";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";
import { HttpError } from "@hichchi/ngx-utils";

@Component({
    selector: "app-admin-quiz-answers",
    templateUrl: "./admin-quiz-answers.component.html",
    styleUrls: ["./admin-quiz-answers.component.scss"],
    imports: [
        NgIf,
        StudentQuizComponent,
        SectionComponent,
        StudentQuizComponent,
        StudentQuizComponent,
        SectionHeadingDirective,
        RouterLink,
        SectionComponent,
        SectionComponent,
    ],
})
export class AdminQuizAnswersComponent implements OnInit {
    studentId?: string;

    quizType?: QuizType;

    student?: User;

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
