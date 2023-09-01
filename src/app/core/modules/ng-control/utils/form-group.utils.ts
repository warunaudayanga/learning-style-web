import { FormGroup } from "@angular/forms";

/**
 * Mark a form's controls as dirty if it has invalid controls.
 * @param form - FormGroup to mark as dirty.
 * @returns - Whether the form is invalid.
 */
export const markFormDirty = (form?: FormGroup): boolean => {
    if (form?.invalid) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control?.invalid) {
                control?.markAsDirty({ onlySelf: true });
                control?.markAsTouched({ onlySelf: true });
            }
        });
        return true;
    }
    return false;
};
