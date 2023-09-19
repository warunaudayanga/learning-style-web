import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentSelfRatingQuizComponent } from "./student-self-rating-quiz/student-self-rating-quiz.component";
import { StudentResultComponent } from "./student-result/student-result.component";
import { StudentBeforeLessonFeedbackQuizComponent } from "./student-before-lesson-feedback-quiz/student-before-lesson-feedback-quiz.component";
import { StudentAfterLessonFeedbackQuizComponent } from "./student-after-lesson-feedback-quiz/student-after-lesson-feedback-quiz.component";
import { FelderSilvermanModelComponent } from "./felder-silverman-model/felder-silverman-model.component";

const routes: Routes = [
    { path: "", component: StudentSelfRatingQuizComponent },
    { path: "pre-questionnaire", component: StudentBeforeLessonFeedbackQuizComponent },
    { path: "post-questionnaire", component: StudentAfterLessonFeedbackQuizComponent },
    { path: "result", component: StudentResultComponent },
    { path: "felder-silverman-model", component: FelderSilvermanModelComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
