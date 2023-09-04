import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminStyleQuizComponent } from "./admin-style-quiz/admin-style-quiz.component";

const routes: Routes = [
    { path: "", component: AdminStyleQuizComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
