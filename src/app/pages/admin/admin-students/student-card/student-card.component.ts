import { Component, Input } from "@angular/core";
import { toFirstCase } from "hichchi-utils";

@Component({
    selector: "app-student-card",
    templateUrl: "./student-card.component.html",
    styleUrls: ["./student-card.component.scss"],
})
export class StudentCardComponent {
    @Input() name!: string;

    @Input() category?: string;

    @Input() percentage: number | null = null;

    protected readonly toFirstCase = toFirstCase;
}
