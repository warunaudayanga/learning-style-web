import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizEditorComponent } from "./quiz-editor/quiz-editor.component";
import { QzComponent } from "./qz/qz.component";
import { QzListComponent } from "./qz-list/qz-list.component";
import { NgControlModule } from "../../core/modules/ng-control";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [QuizEditorComponent, QzListComponent, QzComponent],
    imports: [CommonModule, NgControlModule, FormsModule],
    exports: [QuizEditorComponent, QzListComponent, QzComponent],
})
export class SharedModule {}
