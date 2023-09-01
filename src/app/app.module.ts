import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsResetPluginModule } from "ngxs-reset-plugin";
import { AuthState } from "./core/store/auth/auth.state";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "./layout/layout.module";
import { ToastrModule } from "ngx-toastr";
import { environment } from "../environments/environment";
import { APP_BASE_HREF } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./core/interceptors";
import { ResponseInterceptor } from "./core/interceptors/response.interceptor";
import { ErrorResponseInterceptor } from "./core/interceptors/error.interceptor";
import { API } from "./core/tokens/injection-tokens";
import { ApiInterceptorService } from "./core/interceptors/api-interceptor.service";
import { QuizState } from "./core/store/quiz/quiz.state";
// import { HTTP_INTERCEPTORS } from "@angular/common/http";
// import { AuthInterceptor } from "./core/interceptors";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgxsModule.forRoot([AuthState, QuizState], { developmentMode: !environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
        NgxsStoragePluginModule.forRoot(),
        NgxsResetPluginModule.forRoot(),
        ToastrModule.forRoot(),
        LayoutModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: API, useValue: environment.apiBaseUrl },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
