// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { IndividualConfig, ToastrService } from "ngx-toastr";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { User } from "./core/interfaces/models";
import { ScrollDir } from "./core/enums/scroll-dir.enum";
import { StudentMenu } from "./core/enums/menus/student-menu.enum";
import { AdinMenu } from "./core/enums/menus/adin-menu.enum";
import { HeaderMenu } from "./core/enums/menus/header-menu.enum";
import { MenuToggleOptions } from "./core/interfaces";

@Injectable({
    providedIn: "root",
})
export class AppService {
    private _user?: User;

    private userListener: Subject<User | undefined> = new Subject<User | undefined>();

    toastConfig: Partial<IndividualConfig>;

    private scrollToListener: Subject<ScrollDir> = new Subject<ScrollDir>();

    private scrollEndListener: Subject<ScrollDir> = new Subject<ScrollDir>();

    sideMenuToggleListener: ReplaySubject<MenuToggleOptions<StudentMenu | AdinMenu>> = new ReplaySubject<
        MenuToggleOptions<StudentMenu | AdinMenu>
    >();

    headerMenuToggleListener: ReplaySubject<MenuToggleOptions<HeaderMenu>> = new ReplaySubject<
        MenuToggleOptions<HeaderMenu>
    >();

    constructor(
        private readonly router: Router,
        private toast: ToastrService,
    ) {
        this.toastConfig = { positionClass: "toast-top-right" };
    }

    get user(): User | undefined {
        return this._user;
    }

    set user(user: User | undefined) {
        this.userListener.next(user);
        this._user = user;
    }

    getUserListener(): Observable<User | undefined> {
        return this.userListener.asObservable();
    }

    scrollToTop(): void {
        this.scrollToListener.next(ScrollDir.TOP);
    }

    scrollToBottom(): void {
        this.scrollToListener.next(ScrollDir.BOTTOM);
    }

    getScrollToListener(): Observable<ScrollDir> {
        return this.scrollToListener.asObservable();
    }

    setScrollEnded(direction: ScrollDir): void {
        this.scrollEndListener.next(direction);
    }

    getScrollEndListener(): Observable<ScrollDir> {
        return this.scrollEndListener.asObservable();
    }

    toggleMenu(show: boolean, key: StudentMenu | AdinMenu | HeaderMenu): void {
        if ([...Object.values(StudentMenu), ...Object.values(AdinMenu)].includes(key as StudentMenu | AdinMenu)) {
            this.sideMenuToggleListener.next({ show, key: key as StudentMenu | AdinMenu });
        } else if (Object.values(HeaderMenu).includes(key as HeaderMenu)) {
            this.headerMenuToggleListener.next({ show, key: key as HeaderMenu });
        }
    }

    getMenuToggleListener(): Observable<MenuToggleOptions<StudentMenu | AdinMenu>> {
        return this.sideMenuToggleListener.asObservable();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(path: any | any[], params?: { [key: string]: any }, state?: { [key: string]: any }): void {
        if (params || typeof path !== "string") {
            this.router.navigate(path, { queryParams: params, state }).then();
        } else {
            this.router.navigateByUrl(path).then();
        }
    }

    public success(message: string): void {
        this.toast.success(message, undefined, this.toastConfig);
    }

    public info(message: string): void {
        this.toast.info(message, undefined, this.toastConfig);
    }

    public error(message: string): void {
        this.toast.error(message, undefined, this.toastConfig);
    }

    public warning(message: string): void {
        this.toast.warning(message, undefined, this.toastConfig);
    }

    public static log(data: unknown): void {
        // eslint-disable-next-line no-console
        if (!environment.production) console.log(data);
    }
}
