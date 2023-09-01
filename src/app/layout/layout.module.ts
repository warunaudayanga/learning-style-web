import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { StudentLayoutComponent } from "./student-layout/student-layout.component";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "../core/store/auth/auth.state";
import { RouterModule, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { ContentComponent } from "./shared/content/content.component";
import { SectionComponent } from "./shared/section/section.component";
import { PopUpMenuComponent } from "./shared/pop-up-menu/pop-up-menu.component";
import { NgControlModule } from "../core/modules/ng-control";
import { SectionHeadingDirective } from "../core/directives/section-heading.directive";

@NgModule({
    declarations: [
        AuthLayoutComponent,
        AdminLayoutComponent,
        StudentLayoutComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        PopUpMenuComponent,
        SectionComponent,
        SectionHeadingDirective,
    ],
    imports: [CommonModule, NgxsModule.forFeature([AuthState]), RouterOutlet, RouterModule, NgControlModule],
    exports: [SectionComponent, SectionHeadingDirective],
})
export class LayoutModule {}
