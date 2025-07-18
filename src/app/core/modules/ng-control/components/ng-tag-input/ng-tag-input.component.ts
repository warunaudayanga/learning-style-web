import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-tag-input",
    templateUrl: "./ng-tag-input.component.html",
    styleUrls: ["./ng-tag-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgTagInputComponent),
            multi: true,
        },
    ],
    imports: [NgForOf, NgIf, NgIf],
})
export class NgTagInputComponent implements ControlValueAccessor {
    @Input() name?: string;

    @Input() readonly?: boolean;

    @Input() classList?: string[];

    tags: string[] = [];

    // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
    onChange: (tags: string[]) => void = () => {};

    // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
    onTouched: (tags: string[]) => void = () => {};

    disabled = false;

    writeValue(tags: string[]): void {
        this.tags = tags;
    }

    registerOnChange(fn: (tags: string[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (tags: string[]) => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    keyDown(e: KeyboardEvent): void {
        const tagInput = e.target as HTMLInputElement;
        if (e.key === "Enter") {
            e.preventDefault();
            if (!this.tags.includes(tagInput.value)) {
                if (this.tags) {
                    this.tags.push(tagInput.value);
                } else {
                    this.tags = [tagInput.value];
                }
            }
            tagInput.value = "";
            this.onChange(this.tags);
        }
    }

    remove(tag: string): void {
        this.tags = this.tags.filter(t => t !== tag);
        this.onChange(this.tags);
    }

    getClasses(): string {
        return this.classList?.join(" ") ?? "";
    }
}
