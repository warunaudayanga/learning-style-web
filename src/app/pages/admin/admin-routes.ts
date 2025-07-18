import { Routes } from "@angular/router";
import { AdminSelfRatingQuizComponent } from "./admin-self-rating-quiz/admin-self-rating-quiz.component";
import { AdminAfterLessonFeedbackQuizComponent } from "./admin-after-lesson-feedback-quiz/admin-after-lesson-feedback-quiz.component";
import { AdminBeforeLessonFeedbackQuizComponent } from "./admin-before-lesson-feedback-quiz/admin-before-lesson-feedback-quiz.component";
import { AdminStudentsComponent } from "./admin-students/admin-students.component";
import { AdminStudentResultComponent } from "./admin-student-result/admin-student-result.component";
import { AdminQuizAnswersComponent } from "./admin-quiz-answers/admin-quiz-answers.component";
import { FelderSilvermanModelComponent } from "../shared/felder-silverman-model/felder-silverman-model.component";
import { AdminFeedbackAnalysisComponent } from "./admin-after-lesson-feedback-analysis/admin-feedback-analysis.component";

export const adminRoutes: Routes = [
    { path: "self-rating-quiz", component: AdminSelfRatingQuizComponent },
    { path: "pre-questionnaire", component: AdminAfterLessonFeedbackQuizComponent },
    { path: "post-questionnaire", component: AdminBeforeLessonFeedbackQuizComponent },
    { path: "students", component: AdminStudentsComponent },
    { path: "feedback-analysis", component: AdminFeedbackAnalysisComponent },
    { path: "students/:id", component: AdminStudentResultComponent },
    { path: "students/:id/:quizType", component: AdminQuizAnswersComponent },
    { path: "felder-silverman-model", component: FelderSilvermanModelComponent },
    { path: "**", redirectTo: "students", pathMatch: "full" },
];
