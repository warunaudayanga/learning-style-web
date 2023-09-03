import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { HttpError } from "../interfaces";
import { AuthError } from "../enums/errors/auth.error.enum";

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpError<AuthError>) => {
                if (!(error.error instanceof ErrorEvent)) {
                    if (error?.error?.status === 401 && error?.error?.code !== AuthError.AUTH_401_INVALID) {
                        // this.store.dispatch(new Logout());
                        // this.app.load("/"); // TODO: check this
                    }
                }
                return throwError(() => error);
            }),
        );
    }
}
