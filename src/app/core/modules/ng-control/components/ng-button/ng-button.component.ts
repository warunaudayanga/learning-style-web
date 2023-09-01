import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-button",
    templateUrl: "./ng-button.component.html",
    styleUrls: ["./ng-button.component.scss"],
})
export class NgButtonComponent implements OnChanges {
    @Input() label = "";

    @Input() styleClass = "";

    @Input() type: "button" | "submit" = "button";

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() disabled = false;

    @Input() spin = false;

    @Input() spinSize: string | number = 20;

    @Input() spinWidth: string | number = 3;

    @Input() spinInvert = false;

    @Input() loadingText = "Please wait...";

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor() {
        this.updateContent();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["spin"]) {
            this.spin = changes["spin"].currentValue;
            this.updateContent();
        }
    }

    updateContent(): void {
        // if (this.spin) {
        // } else {
        // }
    }
}
