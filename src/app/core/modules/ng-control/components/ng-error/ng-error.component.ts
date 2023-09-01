import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-error",
    templateUrl: "./ng-error.component.html",
    styleUrls: ["./ng-error.component.scss"],
})
export class NgErrorComponent {
    @Input() title = "Something went wrong!";

    @Input() message = "Please try refreshing it again.";

    @Output() onRefresh: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    refresh(e: MouseEvent): void {
        this.onRefresh.emit(e);
    }
}
