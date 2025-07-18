import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    TrackByFunction,
    ViewChild,
} from "@angular/core";

import { PaginatorInterfaces } from "../../../shared/interfaces/paginator.interfaces";
import { DataViewRefreshEvent } from "../../../shared/interfaces/data-view.interfaces";
import { NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";
import { NgPaginatorComponent } from "../paginator/ng-paginator.component";
import { NgErrorComponent } from "../ng-error/ng-error.component";
import { NgSpinnerComponent } from "../ng-spinner/ng-spinner.component";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-data-view",
    templateUrl: "./ng-data-view.component.html",
    styleUrls: ["./ng-data-view.component.scss"],
    imports: [NgTemplateOutlet, NgIf, NgForOf, NgPaginatorComponent, NgErrorComponent, NgSpinnerComponent],
})
export class NgDataViewComponent implements OnChanges, AfterViewInit {
    @Input() items!: unknown[];

    @Input() layout: "list" | "grid" = "list";

    @Input() paginator = true;

    @Input() totalRecords = 0;

    @Input() limit = 10;

    @Input() pageLimit = 5;

    @Input() styleClass?: string;

    @Input() listStyleClass?: string;

    @Input() fit = false;

    @Input() stickyHeader = false;

    @Input() loading = false;

    @Input() error = false;

    @Input() trackBy: TrackByFunction<unknown> = (index: number, item: unknown) => item;

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onPageChange: EventEmitter<PaginatorInterfaces> = new EventEmitter<PaginatorInterfaces>();

    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onRefresh: EventEmitter<DataViewRefreshEvent> = new EventEmitter<DataViewRefreshEvent>();

    @ContentChild("header") header!: TemplateRef<unknown>;

    @ContentChild("item") item!: TemplateRef<unknown>;

    @ViewChild("scrollView") scrollView?: ElementRef<HTMLDivElement>;

    @ViewChild("headerDiv") headerDiv?: ElementRef<HTMLDivElement>;

    page = 1;

    headerHeight = 0;

    ngAfterViewInit(): void {
        setTimeout(() => {
            const elem = this.headerDiv?.nativeElement;
            if (elem) {
                this.headerHeight =
                    elem.clientHeight +
                    Number(getComputedStyle(elem).marginBottom.replace(/\D/g, "")) +
                    Number(getComputedStyle(elem).marginBottom.replace(/\D/g, ""));
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
        }
    }

    pageChange(e: PaginatorInterfaces): void {
        this.page = e.page;
        this.onPageChange.emit(e);
        this.scrollView?.nativeElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    refresh(e: MouseEvent): void {
        this.onRefresh.emit({ event: e, page: this.page });
    }
}
