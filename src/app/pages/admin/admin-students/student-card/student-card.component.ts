import { Component, Input } from "@angular/core";
import { toFirstCase } from "hichchi-utils";
import { StyleCategory } from "../../../../core/enums/style-category.enum";
import { IUser } from "../../../../core/interfaces/models";

@Component({
    selector: "app-student-card",
    templateUrl: "./student-card.component.html",
    styleUrls: ["./student-card.component.scss"],
})
export class StudentCardComponent {
    @Input() student!: IUser;

    @Input() categories?: StyleCategory[];

    @Input() percentage: number | null = null;

    protected readonly toFirstCase = toFirstCase;
}
