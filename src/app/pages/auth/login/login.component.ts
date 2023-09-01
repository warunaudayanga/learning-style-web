import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AppService } from "../../../app.service";
import { Store } from "@ngxs/store";
import { AuthService } from "../../../core/services/http/auth.service";
import { markFormDirty } from "../../../core/modules/ng-control/utils/form-group.utils";
import { Login } from "../../../core/store/auth/auth.action";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm?: FormGroup;

    authResponseSubscription: Subscription;

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
    ) {
        this.authResponseSubscription = this.authService.getAuthResponseListener().subscribe(res => {
            this.loading = false;
            if (typeof res === "boolean") {
                this.error = res;
            }
        });
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    login(): void {
        if (markFormDirty(this.loginForm)) {
            return;
        }
        this.loading = true;
        this.store.dispatch(new Login(this.loginForm!.value));
    }

    ngOnDestroy(): void {
        this.authResponseSubscription.unsubscribe();
    }
}
