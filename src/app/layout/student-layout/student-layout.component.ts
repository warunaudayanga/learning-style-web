import { Component } from "@angular/core";
import { MenuItem } from "../../core/interfaces";
import { StudentMenu } from "../../core/enums/menus/student-menu.enum";

@Component({
    selector: "app-student-layout",
    templateUrl: "./student-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./student-layout.component.scss"],
})
export class StudentLayoutComponent {
    items: MenuItem<StudentMenu>[] = [
        {
            key: StudentMenu.LEARNING_STYLE,
            label: "Learning Style",
            icon: "bi bi-mortarboard",
            routerLink: "/",
        },
        {
            key: StudentMenu.LEARNING_STYLE_RESULT,
            label: "Learning Style Result",
            icon: "bi bi-search",
            routerLink: "/style-result",
            hidden: true,
        },
    ];
}
