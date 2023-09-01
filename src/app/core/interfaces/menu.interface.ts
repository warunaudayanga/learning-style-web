export interface MenuItem {
    label?: string;
    icon?: string;
    active?: boolean;
    action?: (event?: unknown) => void;
    routerLink?: string | string[];
    items?: MenuItem[];
    separator?: boolean;
}
