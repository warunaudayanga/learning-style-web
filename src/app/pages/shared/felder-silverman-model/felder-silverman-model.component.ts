import { Component } from "@angular/core";
import { SectionComponent } from "../../../layout/shared/section/section.component";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";

@Component({
    selector: "app-felder-silverman-model",
    templateUrl: "./felder-silverman-model.component.html",
    styleUrls: ["./felder-silverman-model.component.scss"],
    standalone: true,
    imports: [
        SectionComponent,
        SectionComponent,
        SectionHeadingDirective,
        SectionComponent,
        SectionComponent,
        SectionHeadingDirective,
        SectionHeadingDirective,
    ],
})
export class FelderSilvermanModelComponent {}
