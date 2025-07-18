import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-auth",
    templateUrl: "./auth-layout.component.html",
    styleUrls: ["../shared/layout.scss", "./auth-layout.component.scss"],
    imports: [RouterOutlet],
})
export class AuthLayoutComponent {}
