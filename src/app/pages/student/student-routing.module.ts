import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentStyleQuizComponent } from "./student-style-quiz/student-style-quiz.component";
import { StudentStyleResultComponent } from "./student-style-result/student-style-result.component";

const routes: Routes = [
    { path: "", component: StudentStyleQuizComponent },
    { path: "style-result", component: StudentStyleResultComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
