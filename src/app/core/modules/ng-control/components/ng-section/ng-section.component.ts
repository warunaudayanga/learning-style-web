import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { NgSectionContentDirective } from "../../directives/ng-section/ng-section-content.directive";
import { NgIf, NgTemplateOutlet } from "@angular/common";
import { NgErrorComponent } from "../ng-error/ng-error.component";
import { NgSpinnerComponent } from "../ng-spinner/ng-spinner.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-section",
    templateUrl: "./ng-section.component.html",
    styleUrls: ["./ng-section.component.scss"],
    imports: [NgIf, NgTemplateOutlet, NgErrorComponent, NgErrorComponent, NgSpinnerComponent],
})
export class NgSectionComponent implements OnChanges {
    @Input() loading = false;

    @Input() error = false;

    @Input() styleClass = "";

    @Output() onRefresh: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ContentChild(NgSectionContentDirective) content?: NgSectionContentDirective;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["loading"]) {
            this.loading = changes["loading"].currentValue;
        }
        if (changes["error"]) {
            this.error = changes["error"].currentValue;
        }
    }

    refresh(e: MouseEvent): void {
        this.onRefresh.emit(e);
    }
}
