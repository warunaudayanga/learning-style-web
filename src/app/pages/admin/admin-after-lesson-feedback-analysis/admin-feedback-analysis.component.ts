import { Component, OnInit } from "@angular/core";
import { QuizService } from "../../../core/services/http/quiz.service";
import { QuizType } from "../../../core/enums/quiz-type.eum";
import { HttpError } from "../../../core/interfaces";
import { QuizCollection } from "../../../core/interfaces/models/quiz";
import { Quiz, QuizChoice } from "../../../core/interfaces/quiz.interfaces";
import { AppService } from "../../../app.service";
import { ChartConfiguration } from "chart.js";

@Component({
    selector: "app-admin-feedback-analysis",
    templateUrl: "./admin-feedback-analysis.component.html",
    styleUrls: ["./admin-feedback-analysis.component.scss"],
})
export class AdminFeedbackAnalysisComponent implements OnInit {
    loading = false;

    error = false;

    quizzes?: QuizCollection<Quiz<QuizChoice>>;

    weightedAverage: number[] = [];

    barChartDataSet: ChartConfiguration<"bar">["data"][] = [];

    barChartOptions: ChartConfiguration<"bar">["options"] = {
        responsive: false,
        elements: {
            bar: {
                backgroundColor: "#399100",
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Responses",
                },
            },
        },
    };

    constructor(
        private readonly app: AppService,
        private readonly quizService: QuizService,
    ) {}

    ngOnInit(): void {
        this.quizService.getQuizCollection(QuizType.AFTER_LECTURE).subscribe({
            next: quizzes => {
                this.loading = false;
                this.quizzes = quizzes;
                this.calculate();
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message || "Something went wrong!");
            },
        });
    }

    calculate(): void {
        this.quizzes?.quizzes.forEach(quiz => {
            const choice1: number =
                this.quizzes?.answers.filter(
                    userAnswers => userAnswers.answers?.find(ans => ans.id === quiz.id)?.answer?.[0]?.value === "1",
                )?.length || 0;
            const choice2: number =
                this.quizzes?.answers.filter(
                    userAnswers => userAnswers.answers?.find(ans => ans.id === quiz.id)?.answer?.[0]?.value === "2",
                )?.length || 0;
            const choice3: number =
                this.quizzes?.answers.filter(
                    userAnswers => userAnswers.answers?.find(ans => ans.id === quiz.id)?.answer?.[0]?.value === "3",
                )?.length || 0;
            const choice4: number =
                this.quizzes?.answers.filter(
                    userAnswers => userAnswers.answers?.find(ans => ans.id === quiz.id)?.answer?.[0]?.value === "4",
                )?.length || 0;
            const choice5: number =
                this.quizzes?.answers.filter(
                    userAnswers => userAnswers.answers?.find(ans => ans.id === quiz.id)?.answer?.[0]?.value === "5",
                )?.length || 0;

            this.barChartDataSet.push({
                labels: ["1", "2", "3", "4", "5"],
                datasets: [{ data: [choice1, choice2, choice3, choice4, choice5], label: "Responses" }],
            });

            this.weightedAverage.push(
                Number(
                    (
                        (choice1 + 2 * choice2 + 3 * choice3 + 4 * choice4 + 5 * choice5) /
                        (choice1 + choice2 + choice3 + choice4 + choice5)
                    ).toFixed(2),
                ),
            );
        });
    }
}
