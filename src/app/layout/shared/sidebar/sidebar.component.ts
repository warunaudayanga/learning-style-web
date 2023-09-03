import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { MenuItem, MenuToggleOptions } from "../../../core/interfaces";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StudentMenu } from "../../../core/enums/menus/student-menu.enum";
import { AdinMenu } from "../../../core/enums/menus/adin-menu.enum";
import { AppService } from "../../../app.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, AfterContentInit, OnDestroy {
    @Input() items: MenuItem[] = [];

    @Input() activeIndex = 0;

    @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

    menuToggleSub?: Subscription;

    private url = "";

    constructor(
        private readonly router: Router,
        private readonly app: AppService,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.url = event.url;
                this.items.find((item, index) => {
                    return item.routerLink === this.url && this.activate(index);
                });
            }
        });
    }

    ngOnInit(): void {
        this.menuToggleSub = this.app
            .getMenuToggleListener()
            .subscribe((options: MenuToggleOptions<StudentMenu | AdinMenu>) => {
                this.items.forEach(item => {
                    if (item.key === options.key) {
                        item.hidden = !options.show;
                    }
                });
            });
    }

    ngAfterContentInit(): void {
        this.items.find((item, index) => {
            return item.routerLink === this.url && this.activate(index);
        });
    }

    activate(index: number): void {
        this.activeIndex = index;
        this.activeIndexChange.emit(index);
    }

    onClick(e: MouseEvent, index: number, item: MenuItem): void {
        item.action?.(e);
        this.activate(index);
    }

    ngOnDestroy(): void {
        this.menuToggleSub?.unsubscribe();
    }
}
