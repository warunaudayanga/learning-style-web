import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizListEditorComponent } from "./components/quiz-list-editor/quiz-list-editor.component";
import { QuizEditorComponent } from "./components/quiz-editor/quiz-editor.component";
import { QzListComponent } from "./components/qz-list/qz-list.component";
import { QzComponent } from "./components/qz/qz.component";
import { NgControlModule } from "../ng-control";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [QuizListEditorComponent, QuizEditorComponent, QzListComponent, QzComponent],
    imports: [CommonModule, NgControlModule, FormsModule],
    exports: [QuizListEditorComponent, QuizEditorComponent, QzListComponent, QzComponent],
})
export class QuizModule {}
