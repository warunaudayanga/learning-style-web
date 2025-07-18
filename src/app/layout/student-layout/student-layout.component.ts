import { Component } from "@angular/core";
import { MenuItem } from "../../core/interfaces";
import { StudentMenu } from "../../core/enums/menus/student-menu.enum";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { ContentComponent } from "../shared/content/content.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-student-layout",
    templateUrl: "./student-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./student-layout.component.scss"],
    imports: [SidebarComponent, SidebarComponent, HeaderComponent, ContentComponent, RouterOutlet],
})
export class StudentLayoutComponent {
    items: MenuItem<StudentMenu>[] = [
        {
            key: StudentMenu.SELF_RATING_QUESTIONNAIRE,
            label: "ILS Questionnaire",
            icon: "bi bi-alexa",
            routerLink: "",
        },
        // {
        //     key: StudentMenu.BEFORE_LECTURE_QUESTIONNAIRE,
        //     label: "Before Lecture Feedback",
        //     icon: "bi bi-bar-chart-line",
        //     routerLink: "/pre-questionnaire",
        // },
        {
            key: StudentMenu.AFTER_LECTURE_QUESTIONNAIRE,
            label: "After Lesson Feedback",
            icon: "bi bi-bar-chart-line-fill",
            routerLink: "/post-questionnaire",
        },
        {
            key: StudentMenu.RESULT,
            label: "Your Results",
            icon: "bi bi-list-check",
            routerLink: "/result",
        },
        {
            key: StudentMenu.FELDER_SILVERMAN_MODEL,
            label: "Felder-Silverman Model",
            icon: "bi bi-info-circle-fill",
            routerLink: "/felder-silverman-model",
        },
    ];
}
