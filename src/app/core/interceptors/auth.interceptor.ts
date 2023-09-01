import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Store } from "@ngxs/store";
import { StateClear } from "ngxs-reset-plugin";
import { AuthState } from "../store/auth/auth.state";
import { AppService } from "../../app.service";
import { environment } from "../../../environments/environment";
import { HttpError } from "../interfaces";
import { AuthError } from "../enums/errors/auth.error.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private app: AppService,
        private store: Store,
    ) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const update = !environment.production ? { withCredentials: true } : {};
        const authRequest: HttpRequest<unknown> = req.clone(update);
        return this.handleRequest(next, authRequest);
    }

    private handleRequest(next: HttpHandler, req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((err: HttpError<AuthError>) => {
                if (err.status === 401 && err.error?.code === AuthError.AUTH_401_INVALID_TOKEN) {
                    if (this.store.selectSnapshot(AuthState.loggedIn)) {
                        this.store.dispatch(new StateClear());
                        this.app.warning("Your session timed out");
                        this.app.load(["/auth"]);
                    }
                }
                return throwError(() => {
                    return err || {};
                });
            }),
        );
    }
}
