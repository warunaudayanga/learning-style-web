import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, take } from "rxjs";
import { LoginDto } from "../../dtos/auth/login-dto";
import { User } from "../../interfaces/models";
import { SuccessResponse } from "../../interfaces";
import { AuthError } from "../../enums/errors/auth.error.enum";

export const AUTH_URL = "auth";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(protected http: HttpClient) {}

    authResponseListener: Subject<AuthError | boolean> = new Subject<AuthError | boolean>();

    login(loginDto: LoginDto): Observable<User> {
        return this.http.post<User>(`${AUTH_URL}/login`, loginDto).pipe(take(1));
    }

    register(formData: FormData): Observable<User> {
        return this.http.post<User>(`${AUTH_URL}/register`, formData).pipe(take(1));
    }

    me(): Observable<User> {
        return this.http.get<User>(`${AUTH_URL}/me`).pipe(take(1));
    }

    logout(): Observable<SuccessResponse> {
        return this.http.post<SuccessResponse>(`${AUTH_URL}/logout`, {}).pipe(take(1));
    }

    setAuthenticationResponse(res: AuthError | boolean): void {
        this.authResponseListener.next(res);
    }

    getAuthResponseListener(): Observable<AuthError | boolean> {
        return this.authResponseListener.asObservable();
    }
}
