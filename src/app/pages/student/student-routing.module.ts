import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentQuizComponent } from "./student-quiz/student-quiz.component";

const routes: Routes = [
    { path: "", component: StudentQuizComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
