import { Component, ContentChild, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { SectionHeadingDirective } from "../../../core/directives/section-heading.directive";

@Component({
    selector: "app-section",
    templateUrl: "./section.component.html",
    styleUrls: ["./section.component.scss"],
})
export class SectionComponent implements OnChanges {
    @Input() full = false;

    @Input() transparent = false;

    @Input() loading = false;

    @Input() error = false;

    @Output() onRefresh: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ContentChild(SectionHeadingDirective) heading?: SectionHeadingDirective;

    @HostBinding("class.app-section-full") get appSectionFull(): boolean {
        return this.full;
    }

    @HostBinding("class.app-section-transparent") get appSectionTransparent(): boolean {
        return this.transparent;
    }

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
