import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminSelfRatingQuizComponent } from "./admin-self-rating-quiz/admin-self-rating-quiz.component";
import { AdminAfterLessonFeedbackQuizComponent } from "./admin-after-lesson-feedback-quiz/admin-after-lesson-feedback-quiz.component";
import { AdminBeforeLessonFeedbackQuizComponent } from "./admin-before-lesson-feedback-quiz/admin-before-lesson-feedback-quiz.component";
import { AdminStudentsComponent } from "./admin-students/admin-students.component";
import { AdminStudentResultComponent } from "./admin-student-result/admin-student-result.component";
import { AdminQuizAnswersComponent } from "./admin-quiz-answers/admin-quiz-answers.component";

const routes: Routes = [
    { path: "", component: AdminSelfRatingQuizComponent },
    { path: "pre-questionnaire", component: AdminAfterLessonFeedbackQuizComponent },
    { path: "post-questionnaire", component: AdminBeforeLessonFeedbackQuizComponent },
    { path: "students", component: AdminStudentsComponent },
    { path: "students/:id", component: AdminStudentResultComponent },
    { path: "students/:id/:quizType", component: AdminQuizAnswersComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
