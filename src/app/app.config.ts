import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { apiUrlInterceptor, errorResponseInterceptor } from "@hichchi/ngx-utils";
import { environment } from "../environments/environment";
import { authInterceptor, AuthState, NgxHichchiAuthModule } from "@hichchi/ngx-auth";
import { ToastrModule } from "ngx-toastr";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { AuthField } from "@hichchi/nest-connector/auth";
import { AppService } from "./app.service";
import { provideCharts, withDefaultRegisterables } from "ng2-charts";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([
                apiUrlInterceptor(environment.apiBase),
                authInterceptor("/auth"),
                errorResponseInterceptor(AppService, AuthState),
            ]),
        ),
        importProvidersFrom(
            NgxHichchiAuthModule.forRoot({ authField: AuthField.EMAIL, apiBaseURL: "http://localhost:3001" }),
            ToastrModule.forRoot(),
        ),
        provideAnimations(),
        provideRouter(appRoutes),
        provideCharts(withDefaultRegisterables()),
    ],
};
