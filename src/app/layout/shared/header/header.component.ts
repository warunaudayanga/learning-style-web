import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";
import { Select, Store } from "@ngxs/store";
import { Logout } from "../../../core/store/auth/auth.action";
import { HeaderMenu } from "../../../core/enums/menus/header-menu.enum";
import { AuthState } from "../../../core/store/auth/auth.state";
import { Observable, Subscription } from "rxjs";
import { IUser } from "../../../core/interfaces/models";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Select(AuthState.user) user$!: Observable<IUser | undefined>;

    user?: IUser;

    userSub?: Subscription;

    constructor(private readonly store: Store) {}

    menuItems: MenuItem<HeaderMenu>[] = [
        {
            key: HeaderMenu.LOGOUT,
            label: "Logout",
            icon: "bi bi-power",
            action: (): void => {
                this.store.dispatch(new Logout());
            },
        },
    ];

    ngOnInit(): void {
        this.userSub = this.user$.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe();
    }
}
