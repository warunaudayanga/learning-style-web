import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { HttpError } from "../interfaces";
import { AppService } from "../../app.service";
import { AuthError } from "../enums/errors/auth.error.enum";
import { AuthService } from "../services/http/auth.service";

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
    constructor(
        private app: AppService,
        private readonly authService: AuthService,
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpError<AuthError>) => {
                if (!(error.error instanceof ErrorEvent)) {
                    if (error?.error?.status === 401 && error?.error?.code !== AuthError.AUTH_401_INVALID) {
                        this.authService.logout();
                        // this.app.load("/");
                    }
                }
                return throwError(() => error);
            }),
        );
    }
}
