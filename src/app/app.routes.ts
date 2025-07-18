import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { UserRole } from "./core/enums/user-role.enum";
import { StudentLayoutComponent } from "./layout/student-layout/student-layout.component";
import { authGuard, AuthGuardCondition, roleGuard, RoleGuardOption } from "@hichchi/ngx-auth";

export const redirectOptions: RoleGuardOption[] = [
    { state: UserRole.ADMIN, redirect: "/admin" },
    { state: UserRole.STUDENT, redirect: "/" },
];

export const appRoutes: Routes = [
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./pages/auth/auth-routes").then(r => r.authRoutes),
        canActivate: [authGuard(AuthGuardCondition.SIGNED_IN, false, "/")],
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        loadChildren: () => import("./pages/admin/admin-routes").then(r => r.adminRoutes),
        canActivate: [
            authGuard(AuthGuardCondition.SIGNED_IN, true, "/auth"),
            roleGuard(UserRole.ADMIN, redirectOptions),
        ],
    },
    {
        path: "",
        component: StudentLayoutComponent,
        loadChildren: () => import("./pages/student/student-routes").then(r => r.studentRoutes),
        canActivate: [
            authGuard(AuthGuardCondition.SIGNED_IN, true, "/auth"),
            roleGuard(UserRole.STUDENT, redirectOptions),
        ],
    },
];
