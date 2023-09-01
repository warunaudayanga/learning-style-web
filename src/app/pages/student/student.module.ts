import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRoutingModule } from "./student-routing.module";
import { LayoutModule } from "../../layout/layout.module";
import { StudentQuizComponent } from "./student-quiz/student-quiz.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [StudentQuizComponent],
    imports: [CommonModule, StudentRoutingModule, LayoutModule, SharedModule],
})
export class StudentModule {}
