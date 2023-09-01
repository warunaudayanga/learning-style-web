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

@NgModule({
    declarations: [PageNotFoundComponent, CarouselComponent, NgDataViewComponent, SlideComponent],
    imports: [
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
    ],
    exports: [PageNotFoundComponent, CarouselComponent, NgDataViewComponent, SlideComponent],
})
export class SharedModule {}
