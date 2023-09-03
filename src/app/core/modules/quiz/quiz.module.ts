import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QzListComponent } from "./components/qz-list/qz-list.component";
import { QzComponent } from "./components/qz/qz.component";
import { NgControlModule } from "../ng-control";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [QuizEditorComponent, QzListComponent, QzComponent],
    imports: [CommonModule, NgControlModule, FormsModule],
    exports: [QuizEditorComponent, QzListComponent, QzComponent],
})
export class QuizModule {}
