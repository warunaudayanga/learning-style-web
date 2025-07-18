import { Component, inject } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";
import { HeaderMenu } from "../../../core/enums/menus/header-menu.enum";
import { AuthState } from "@hichchi/ngx-auth";
import { PopUpMenuComponent } from "../pop-up-menu/pop-up-menu.component";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    imports: [PopUpMenuComponent],
})
export class HeaderComponent {
    authState = inject(AuthState);

    menuItems: MenuItem<HeaderMenu>[] = [
        {
            key: HeaderMenu.LOGOUT,
            label: "Logout",
            icon: "bi bi-power",
            action: (): void => {
                this.authState.signOut("auth");
            },
        },
    ];
}
