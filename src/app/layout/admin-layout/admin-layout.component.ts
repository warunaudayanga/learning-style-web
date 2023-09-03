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
            key: AdinMenu.LEARNING_STYLE,
            label: "Learning Style",
            icon: "bi bi-mortarboard",
            routerLink: "/admin/classes",
        },
    ];
}
