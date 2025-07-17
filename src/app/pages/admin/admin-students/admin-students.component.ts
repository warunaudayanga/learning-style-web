import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../core/services/http/user.service";
import { User } from "../../../core/interfaces/models";
import { AppService } from "../../../app.service";
import { HttpError } from "../../../core/interfaces";
import { QuizUserAnswers } from "../../../core/interfaces/models/quiz";
import { SelfRatingQuiz } from "../../../core/interfaces/self-rating-quiz.interfaces";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { groupBy } from "hichchi-utils";
import { SelfRatingQuizResultDto } from "../../../core/utils/self-rating-quiz-result.dto";
import { StyleCategory } from "../../../core/enums/style-category.enum";

@Component({
    selector: "app-admin-students",
    templateUrl: "./admin-students.component.html",
    styleUrls: ["./admin-students.component.scss"],
})
export class AdminStudentsComponent implements OnInit {
    students: User[] = [];

    studentGroups?: [string | undefined, User[]][];

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        private readonly userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getStudents();
        // this.app.setTitle("Students");
    }

    getStudents(): void {
        this.loading = true;
        this.error = false;
        this.userService.getStudents().subscribe({
            next: students => {
                this.loading = false;
                this.students = students.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
                this.studentGroups = Array.from(
                    groupBy(students, (student: User) => student.regNo?.split("/")?.[1]).entries(),
                ).sort((a, b) => (a[0] && b[0] ? a[0].localeCompare(b[0]) : 0));
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    getResult(answers?: QuizUserAnswers<SelfRatingQuiz>[]): SelfRatingQuizResultDto | undefined {
        const answer: QuizUserAnswers<SelfRatingQuiz> | undefined = answers?.find(
            answer => answer.quizCollection?.type === QuizType.SELF_RATING,
        );
        return answer ? new SelfRatingQuizResultDto(answer.result) : undefined;
    }

    refresh(): void {
        this.getStudents();
    }

    filterByCategory(students: User[], category?: StyleCategory | "mixed"): User[] {
        return students.filter(student => {
            const categories = this.getResult(student.answers)?.result?.final?.categories;
            if (category === "mixed") {
                return categories && categories?.length > 1;
            } else if (category) {
                return categories && categories?.length === 1 && categories?.includes(category);
            }
            return !categories || categories?.length === 0;
        });
    }

    protected readonly StyleCategory = StyleCategory;
}
