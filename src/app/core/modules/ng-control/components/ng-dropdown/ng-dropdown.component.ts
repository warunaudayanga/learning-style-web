import { Component, Input } from "@angular/core";
import { NgItem } from "../../interfaces/ng-dropdown.interfaces";
import { NgForOf, NgIf } from "@angular/common";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-dropdown",
    templateUrl: "./ng-dropdown.component.html",
    styleUrls: ["./ng-dropdown.component.scss"],
    imports: [NgIf, NgForOf],
})
export class NgDropdownComponent {
    @Input() class?: string;

    @Input() title?: string;

    @Input() items?: NgItem[];

    @Input() buttonClass?: string;

    @Input() hoverable?: boolean;

    @Input() autoClose?: boolean = true;

    opened = false;
}
