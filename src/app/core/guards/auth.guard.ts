// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import { ActivatedRouteSnapshot, CanActivateFn } from "@angular/router";
import { AuthState } from "../store/auth/auth.state";
import { UserRole } from "../enums/user-role.enum";
import { Logout } from "../store/auth/auth.action";
import { inject } from "@angular/core";
import { AppService } from "../../app.service";
import { Store } from "@ngxs/store";

const getResolvedUrl = (route: ActivatedRouteSnapshot): string => {
    return (
        route.pathFromRoot
            // eslint-disable-next-line prettier/prettier
            .map(v => v.url.map(segment => segment.toString()).filter(v => v !== "").join("/"))
            .filter(v => v !== "")
            .join("/")
    );
};

const getConfiguredUrl = (route: ActivatedRouteSnapshot): string => {
    return (
        "/" +
        route.pathFromRoot
            .filter(v => v.routeConfig)
            .map(v => v.routeConfig?.path)
            .filter(v => v !== "")
            .join("/")
    );
};

const redirect = (role?: UserRole): void => {
    const app = inject(AppService);
    switch (role) {
        case UserRole.ADMIN:
            app.load("admin");
            break;
        case UserRole.STUDENT:
            app.load("student");
            break;
        default:
            inject(Store).dispatch(new Logout());
    }
};

export const authGuard: CanActivateFn = (route, _state) => {
    const app = inject(AppService);
    const store = inject(Store);
    const loggedIn = store.selectSnapshot(AuthState.loggedIn);
    if (loggedIn) {
        const role = store.selectSnapshot(AuthState.role);
        const roles = route.data["roles"] as UserRole[];
        if (role && !getResolvedUrl(route).match(/auth/) && roles.includes(role)) {
            return true;
        }
        redirect(role);
        return false;
    } else if (getResolvedUrl(route).match(/auth/)) {
        return true;
    }
    app.load("auth");
    return false;
};
