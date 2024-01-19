import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { SlideComponent } from "./components/carousel/slide/slide.component";
import { RouterModule } from "@angular/router";
import { NgDataViewComponent } from "../ng-control/components/ng-data-view/ng-data-view.component";
import { NgControlModule } from "../ng-control";
import { PipeModule } from "../pipe/pipe.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MomentModule } from "ngx-moment";
import { QuizModule } from "../quiz/quiz.module";
import { LayoutModule } from "../../../layout/layout.module";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { SelfRatingAnalysisComponent } from "./components/self-rating-analysis/self-rating-analysis.component";
import { AfterLessonFeedbackComponent } from "./components/after-lesson-feedback/after-lesson-feedback.component";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        CarouselComponent,
        NgDataViewComponent,
        SlideComponent,
        SelfRatingAnalysisComponent,
        AfterLessonFeedbackComponent,
    ],
    imports: [
        ProgressbarModule,
        CommonModule,
        RouterModule,
        PipeModule,
        NgControlModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MomentModule,
        FormsModule,
        QuizModule,
        LayoutModule,
    ],
    exports: [
        ProgressbarModule,
        PageNotFoundComponent,
        CarouselComponent,
        NgDataViewComponent,
        SlideComponent,
        RouterModule,
        PipeModule,
        NgControlModule,
        MatDialogModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatButtonModule,
        MomentModule,
        FormsModule,
        QuizModule,
        SelfRatingAnalysisComponent,
        AfterLessonFeedbackComponent,
    ],
})
export class SharedModule {}
