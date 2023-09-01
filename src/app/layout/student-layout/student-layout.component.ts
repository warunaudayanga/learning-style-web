import { Component } from "@angular/core";
import { MenuItem } from "../../core/interfaces";

@Component({
    selector: "app-student-layout",
    templateUrl: "./student-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./student-layout.component.scss"],
})
export class StudentLayoutComponent {
    items: MenuItem[] = [
        {
            label: "My Classes",
            icon: "bi bi-mortarboard",
            routerLink: "/student/my-classes",
        },
        {
            label: "Find Class",
            icon: "bi bi-search",
            routerLink: "/student/find-class",
        },
    ];
}
