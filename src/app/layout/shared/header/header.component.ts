import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";
import { Store } from "@ngxs/store";
import { Logout } from "../../../core/store/auth/auth.action";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
    constructor(private readonly store: Store) {}

    menuItems: MenuItem[] = [
        {
            label: "Logout",
            icon: "bi bi-power",
            action: (): void => {
                this.store.dispatch(new Logout());
            },
        },
    ];
}
