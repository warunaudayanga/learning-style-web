import { Component } from "@angular/core";
import { MenuItem } from "../../core/interfaces";

@Component({
    selector: "app-admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./admin-layout.component.scss"],
})
export class AdminLayoutComponent {
    items: MenuItem[] = [
        {
            label: "Manage Classes",
            icon: "bi bi-mortarboard",
            routerLink: "/admin/classes",
        },
        {
            label: "Manage Tutors",
            icon: "bi bi-people",
            routerLink: "/admin/tutors",
        },
        {
            label: "Manage Students",
            icon: "bi bi-people",
            routerLink: "/admin/students",
        },
        {
            label: "Grades",
            icon: "bi bi-123",
            routerLink: "/admin/grades",
        },
        {
            label: "Subjects",
            icon: "bi bi-book-half",
            routerLink: "/admin/subjects",
        },
    ];
}
