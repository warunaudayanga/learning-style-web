import { Routes } from "@angular/router";
import { StudentSelfRatingQuizComponent } from "./student-self-rating-quiz/student-self-rating-quiz.component";
import { StudentResultComponent } from "./student-result/student-result.component";
import { StudentBeforeLessonFeedbackQuizComponent } from "./student-before-lesson-feedback-quiz/student-before-lesson-feedback-quiz.component";
import { StudentAfterLessonFeedbackQuizComponent } from "./student-after-lesson-feedback-quiz/student-after-lesson-feedback-quiz.component";
import { FelderSilvermanModelComponent } from "../shared/felder-silverman-model/felder-silverman-model.component";

export const studentRoutes: Routes = [
    { path: "", component: StudentSelfRatingQuizComponent },
    { path: "pre-questionnaire", component: StudentBeforeLessonFeedbackQuizComponent },
    { path: "post-questionnaire", component: StudentAfterLessonFeedbackQuizComponent },
    { path: "result", component: StudentResultComponent },
    { path: "felder-silverman-model", component: FelderSilvermanModelComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];
