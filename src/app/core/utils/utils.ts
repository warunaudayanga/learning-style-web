// noinspection JSUnusedGlobalSymbols

import { toTitleCase } from "hichchi-utils";
import { CustomComponentType, HttpError, IDropdownValue, IEnumToDropdownFormat } from "../interfaces";
import { inject } from "@angular/core";
import { Observer } from "rxjs";
import { AppService } from "../../app.service";

/**
 * Convert an enum to a dropdown list.
 * @param object - Enum to convert.
 * @param format - Format to apply to the dropdown list.
 * @returns - Dropdown list.
 */
export const enumToDropdownList = <T>(object: { [s: string]: T } | ArrayLike<T>, format?: IEnumToDropdownFormat): IDropdownValue[] => {
    const values: IDropdownValue[] = Object.entries(object)
        .filter(([key]: [string, T]): boolean => isNaN(Number(key)))
        .map(([name, value]) => ({
            name: format?.name ? format.name(name, value) : toTitleCase(name),
            value: format?.value ? format.value(value) : value,
        }));
    if (format?.all) {
        values.unshift({
            name: "All",
            value: null,
        });
    }
    return values;
};

export const handleObserver = <T, Component extends CustomComponentType>(handler: (res: T) => void, comp: Component): Partial<Observer<T>> => {
    return {
        next: (res): void => {
            comp.loading = false;
            handler(res);
        },
        error: (error: HttpError): void => {
            comp.error = true;
            comp.loading = false;
            inject(AppService).error(error.error?.message ?? "Something went wrong!");
        },
    };
};
