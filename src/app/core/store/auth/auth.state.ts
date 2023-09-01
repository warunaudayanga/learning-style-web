import { Injectable, NgZone } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { ClearLoggedUser, Login, Logout, SetLoggedUser } from "./auth.action";
import { catchError, Observable, of, take } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { StateClear } from "ngxs-reset-plugin";
import { AppService } from "src/app/app.service";
import { AuthService } from "src/app/core/services/http/auth.service";
import { IUser } from "../../interfaces/models";
import { UserRole } from "../../enums/user-role.enum";
import { HttpError, SuccessResponse } from "../../interfaces";
import { AuthError } from "../../enums/errors/auth.error.enum";

interface AuthStateModel {
    loggedIn: boolean;
    user?: IUser;
}

@State<AuthStateModel>({
    name: "auth",
    defaults: {
        loggedIn: false,
        user: undefined,
    },
})
@Injectable()
export class AuthState {
    constructor(
        private app: AppService,
        private authService: AuthService,
        private store: Store,
        private ngZone: NgZone,
    ) {}

    @Selector()
    static loggedIn(state: AuthStateModel): boolean {
        return state.loggedIn;
    }

    @Selector()
    static user(state: AuthStateModel): IUser | undefined {
        return state.user;
    }

    @Selector()
    static role(state: AuthStateModel): UserRole | undefined {
        return state.user?.role;
    }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, action: Login): Observable<IUser | null> {
        return this.authService.login(action.payload).pipe(
            take(1),
            tap((user: IUser) => {
                this.authService.setAuthenticationResponse(true);
                patchState({
                    loggedIn: true,
                    user,
                });
                this.ngZone.run(() => {
                    this.app.user = user;
                    switch (user.role) {
                        case UserRole.ADMIN:
                            this.app.load("admin");
                            break;
                        default:
                            this.app.load("student");
                    }
                });
            }),
            catchError((err: HttpError<AuthError>) => {
                this.ngZone.run(() => {
                    this.app.error(err.error?.message || "Failed to Login!");
                    this.authService.setAuthenticationResponse(err.error?.code ?? false);
                });
                return of(null);
            }),
        );
    }

    @Action(Logout)
    logout(): Observable<SuccessResponse | null> {
        return this.authService.logout().pipe(
            tap(() => {
                this.ngZone.run(() => {
                    this.app.user = undefined;
                    this.store.dispatch(new StateClear());
                    this.app.load("/");
                });
            }),
            catchError((err: HttpErrorResponse) => {
                this.ngZone.run(() => {
                    this.app.error(err.error?.message || "Something went wrong!");
                    this.store.dispatch(new StateClear());
                    this.app.load("/");
                });
                return of(null);
            }),
        );
    }

    @Action(SetLoggedUser)
    setLoggedUser({ patchState }: StateContext<AuthStateModel>, action: SetLoggedUser): void {
        patchState({
            loggedIn: true,
            user: action.payload,
        });
    }

    @Action(ClearLoggedUser)
    clearLoggedUser({ setState }: StateContext<AuthStateModel>): void {
        setState({
            loggedIn: false,
            user: undefined,
        });
    }
}
