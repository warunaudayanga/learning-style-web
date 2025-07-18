import { Component, OnInit } from "@angular/core";
import { AppService } from "../../../app.service";
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { matched } from "../../../core/validators/validators";
import { enumToDropdownList } from "../../../core/utils/utils";
import { Gender } from "../../../core/enums/gender.enum";
import { markFormDirty } from "../../../core/modules/ng-control/utils/form-group.utils";
import { NgIf } from "@angular/common";
import { NgInputComponent } from "../../../core/modules/ng-control/components/ng-input/ng-input.component";
import { NgButtonComponent } from "../../../core/modules/ng-control/components/ng-button/ng-button.component";
import { NgSelectBoxComponent } from "../../../core/modules/ng-control/components/ng-select-box/ng-select-box.component";
import { RouterLink } from "@angular/router";
import { AuthService } from "@hichchi/ngx-auth";
import { HttpError } from "@hichchi/ngx-utils";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    imports: [NgIf, NgButtonComponent, NgInputComponent, NgSelectBoxComponent, ReactiveFormsModule, RouterLink],
})
export class RegisterComponent implements OnInit {
    registerForm?: FormGroup;

    genders = enumToDropdownList(Gender);

    loading = false;

    error = false;

    constructor(
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
    ) {}

    ngOnInit(): void {
        this.registerForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                username: ["", [Validators.required]],
                password: ["", [Validators.required]],
                confirm: ["", [Validators.required]],
                email: ["", [Validators.required, Validators.email]],
                regNo: ["", [Validators.required]],
                dob: ["", [Validators.required]],
                gender: ["", [Validators.required]],
                cot: [""],
                cotOther: [""],
                olMaths: [""],
                olScience: [""],
                olEnglish: [""],
                alStream: [""],
                alOther: [""],
                alPassed: [null],
                doneIct: [null],
                comAppAssist3: [false],
                ict4: [false],
                hardware4: [false],
                network4: [false],
                graphic4: [false],
                icSupporter4: [false],
                softwareDev4: [false],
                followOther: [false],
                followedOther: [""],
            },
            {
                validators: matched("password", "confirm"),
            } as AbstractControlOptions,
        );
        // this.registerForm?.patchValue({
        //     username: "admin",
        //     password: "admin",
        //     confirm: "admin",
        //     name: "Admin",
        //     email: "admin@123.com",
        //     regNo: "123456",
        //     dob: new Date("1990-01-01"),
        //     gender: Gender.MALE,
        // });
    }

    register(): void {
        if (markFormDirty(this.registerForm)) {
            return;
        }

        this.loading = true;
        this.authService.signUp(this.registerForm!.value).subscribe({
            next: (): void => {
                this.loading = false;
                this.app.load("/auth/login");
            },
            error: (error: HttpError): void => {
                this.error = true;
                this.loading = false;
                this.app.error(error.error?.message ?? "Something went wrong!");
            },
        });
    }
}
