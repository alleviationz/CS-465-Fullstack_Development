import { InjectionToken } from "@angular/core";

// local storage to save trips and users
export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

export class Storage {}