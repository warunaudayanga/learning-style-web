import { Component } from "@angular/core";
import { MenuItem } from "../../core/interfaces";
import { AdinMenu } from "../../core/enums/menus/adin-menu.enum";

@Component({
    selector: "app-admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./admin-layout.component.scss"],
})
export class AdminLayoutComponent {
    items: MenuItem<AdinMenu>[] = [
        {
            key: AdinMenu.SELF_RATING_QUESTIONNAIRE,
            label: "Self Rating",
            icon: "bi bi-alexa",
            routerLink: "/admin",
        },
        {
            key: AdinMenu.BEFORE_LECTURE_QUESTIONNAIRE,
            label: "Before Lecture Feedback",
            icon: "bi bi-bar-chart-line",
            routerLink: "/admin/pre-questionnaire",
        },
        {
            key: AdinMenu.AFTER_LECTURE_QUESTIONNAIRE,
            label: "After Lecture Feedback",
            icon: "bi bi-bar-chart-line-fill",
            routerLink: "/admin/post-questionnaire",
        },
    ];
}
