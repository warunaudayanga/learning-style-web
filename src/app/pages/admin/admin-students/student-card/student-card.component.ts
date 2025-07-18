import { Component, Input } from "@angular/core";
import { toFirstCase } from "@hichchi/utils";
import { StyleCategory } from "../../../../core/enums/style-category.enum";
import { User } from "../../../../core/interfaces/models";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-student-card",
    templateUrl: "./student-card.component.html",
    styleUrls: ["./student-card.component.scss"],
    imports: [NgIf],
})
export class StudentCardComponent {
    @Input() student!: User;

    @Input() categories?: StyleCategory[];

    @Input() percentage: number | null = null;

    protected readonly toFirstCase = toFirstCase;
}
