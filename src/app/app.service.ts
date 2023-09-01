// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { IndividualConfig, ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import { IUser } from "./core/interfaces/models";

@Injectable({
    providedIn: "root",
})
export class AppService {
    private _user?: IUser;

    private userListener: Subject<IUser | undefined> = new Subject<IUser | undefined>();

    toastConfig: Partial<IndividualConfig>;

    constructor(
        private readonly router: Router,
        private toast: ToastrService,
    ) {
        this.toastConfig = { positionClass: "toast-top-right" };
    }

    get user(): IUser | undefined {
        return this._user;
    }

    set user(user: IUser | undefined) {
        this.userListener.next(user);
        this._user = user;
    }

    getUserListener(): Observable<IUser | undefined> {
        return this.userListener.asObservable();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public load(path: any | any[], params?: { [key: string]: any }): void {
        if (params || typeof path !== "string") {
            this.router.navigate(path, { queryParams: params }).then();
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
