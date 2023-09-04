import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentSelfRatingQuizComponent } from "./student-self-rating-quiz/student-self-rating-quiz.component";
import { StudentSelfRatingAnalysisComponent } from "./student-self-rating-analysis/student-self-rating-analysis.component";

const routes: Routes = [
    { path: "", component: StudentSelfRatingQuizComponent },
    { path: "style-result", component: StudentSelfRatingAnalysisComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
