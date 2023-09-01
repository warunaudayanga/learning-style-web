import { Directive, TemplateRef } from "@angular/core";

@Directive({
    selector: "[appSectionHeading]",
})
export class SectionHeadingDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
