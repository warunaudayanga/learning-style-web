/* eslint-disable @typescript-eslint/no-explicit-any */

// noinspection JSUnusedGlobalSymbols
export interface KeyValue<V = any> {
    key: string;
    value: V;
}

export interface IDropdownValue {
    name: string;
    value: any;
}

export interface IEnumToDropdownFormat {
    all?: boolean;
    name?: (name: string, value: any) => any;
    value?: (value: any) => any;
}

export interface CustomComponentType {
    loading: boolean;
    error: boolean;
}
