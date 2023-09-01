import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "../../core/store/auth/auth.state";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgControlModule } from "../../core/modules/ng-control";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule, AuthRoutingModule, NgxsModule.forFeature([AuthState]), ReactiveFormsModule, NgControlModule],
})
export class AuthModule {}
