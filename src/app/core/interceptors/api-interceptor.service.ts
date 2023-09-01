// noinspection JSUnusedGlobalSymbols

import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { API } from "../tokens/injection-tokens";

@Injectable({
    providedIn: "root",
})
export class ApiInterceptorService {
    constructor(@Inject(API) private baseUrl: string) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (req.url.startsWith(this.baseUrl) || req.url.startsWith("http")) {
            return next.handle(req);
        }
        const apiReq = req.clone({
            url: `${this.baseUrl}/${req.url}`,
        });

        return next.handle(apiReq);
    }
}
