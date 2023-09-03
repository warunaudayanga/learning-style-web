import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Subscription } from "rxjs";
import { AppService } from "../../../app.service";
import { ScrollDir } from "../../../core/enums/scroll-dir.enum";

@Component({
    selector: "app-content",
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit, AfterViewInit, OnDestroy {
    scrollListener?: Subscription;

    atBottom = false;

    constructor(
        private renderer: Renderer2,
        private readonly el: ElementRef,
        private readonly appService: AppService,
    ) {}

    ngOnInit(): void {
        this.scrollListener = this.appService.getScrollToListener().subscribe(direction => {
            if (direction === ScrollDir.TOP) {
                this.scrollToTop();
            } else {
                this.scrollToBottom();
            }
        });
    }

    ngAfterViewInit(): void {
        const el = this.el.nativeElement as HTMLElement;
        this.renderer.listen(this.el.nativeElement, "scroll", () => {
            const scrollHeight = el.scrollHeight;
            const top = el.scrollTop;
            const height = el.clientHeight;

            if (top === 0) {
                this.appService.setScrollEnded(ScrollDir.TOP);
            }
            if (top + height + 10 >= scrollHeight) {
                if (!this.atBottom) {
                    this.atBottom = true;
                    this.appService.setScrollEnded(ScrollDir.BOTTOM);
                }
            } else {
                this.atBottom = false;
            }
        });
    }

    scrollToTop(): void {
        this.el?.nativeElement.scrollTo({ top: 0, behavior: "smooth" });
    }

    scrollToBottom(): void {
        const scrollHeight = (this.el?.nativeElement as HTMLElement).scrollHeight;
        this.el?.nativeElement.scrollTo({ top: scrollHeight, behavior: "smooth" });
    }

    ngOnDestroy(): void {
        this.scrollListener?.unsubscribe();
    }
}
