import {
    Component,
    EventEmitter,
    forwardRef,
    Host,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf,
} from "@angular/core";
import { NgFormControl } from "../../abstract-form-controll";
import {
    AbstractControl,
    ControlContainer,
    FormsModule,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
} from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { FirstCasePipe } from "../../../pipe/pipes/string.pipes";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-select-box",
    templateUrl: "./ng-select-box.component.html",
    styleUrls: ["./ng-select-box.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSelectBoxComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSelectBoxComponent),
        },
    ],
    imports: [
        NgIf,
        NgIf,
        NgIf,
        NgIf,
        NgIf,
        NgIf,
        FirstCasePipe,
        NgSelectComponent,
        FormsModule,
        NgSelectComponent,
        NgSelectComponent,
        FormsModule,
        NgSelectComponent,
        NgClass,
        NgSelectComponent,
        NgSelectComponent,
        NgSelectComponent,
        NgSelectComponent,
    ],
})
export class NgSelectBoxComponent<T> extends NgFormControl<T[] | T> implements OnInit, OnChanges {
    @Input() label?: string;

    @Input() description?: string;

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() formControlName!: string;

    @Input() readonly?: boolean;

    @Input() styleClass?: string;

    @Input() inputClass?: string;

    @Input() items: T[] = [];

    @Input() bindLabel = "";

    @Input() bindValue = "";

    @Input() clearable = true;

    @Input() searchable = true;

    @Input() multiple = false;

    @Input() disabled = false;

    @Input() placeholder = "";

    @Input() noValidation: "" | undefined;

    @Output() valueChange: EventEmitter<T[] | T | null> = new EventEmitter<T[] | T | null>();

    constructor(
        @Optional()
        @Host()
        @SkipSelf()
        protected override controlContainer?: ControlContainer,
    ) {
        super(controlContainer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
        }
    }

    ngOnInit(): void {
        this.init();
    }

    // noinspection JSUnusedLocalSymbols
    override onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
    }
}
