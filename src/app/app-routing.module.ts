import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./core/guards";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { StudentLayoutComponent } from "./layout/student-layout/student-layout.component";
import { UserRole } from "./core/enums/user-role.enum";

const routes: Routes = [
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./pages/auth/auth.module").then(mod => mod.AuthModule),
        canActivate: [authGuard],
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        loadChildren: () => import("./pages/admin/admin.module").then(mod => mod.AdminModule),
        canActivate: [authGuard],
        data: { roles: [UserRole.ADMIN] },
    },
    {
        path: "",
        component: StudentLayoutComponent,
        loadChildren: () => import("./pages/student/student.module").then(mod => mod.StudentModule),
        canActivate: [authGuard],
        data: { roles: [UserRole.STUDENT] },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
