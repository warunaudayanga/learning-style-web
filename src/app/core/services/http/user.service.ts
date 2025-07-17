import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { User } from "../../interfaces/models";

export const USER_URL = "user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(protected http: HttpClient) {}

    getStudents(): Observable<User[]> {
        return this.http.get<User[]>(`${USER_URL}/student`).pipe(take(1));
    }

    getStudentById(id: string): Observable<User> {
        return this.http.get<User>(`${USER_URL}/student/${id}`).pipe(take(1));
    }
}
