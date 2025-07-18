import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { markFormDirty } from "../../../core/modules/ng-control/utils/form-group.utils";
import { AuthState } from "@hichchi/ngx-auth";
import { NgInputComponent } from "../../../core/modules/ng-control/components/ng-input/ng-input.component";
import { NgButtonComponent } from "../../../core/modules/ng-control/components/ng-button/ng-button.component";
import { NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { UserRole } from "../../../core/enums/user-role.enum";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    imports: [NgInputComponent, NgButtonComponent, ReactiveFormsModule, NgIf, RouterLink],
})
export class LoginComponent {
    authState = inject(AuthState);

    loginForm?: FormGroup;

    loading = false;

    error = false;

    constructor(private readonly fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    async login(): Promise<void> {
        if (markFormDirty(this.loginForm)) {
            return;
        }
        this.loading = true;
        await this.authState.signIn(this.loginForm!.value, res =>
            (res.user.role && typeof res.user.role === "object" ? res.user.role.name : res.user.role) === UserRole.ADMIN
                ? "admin"
                : "",
        );
        this.loading = false;
    }
}
