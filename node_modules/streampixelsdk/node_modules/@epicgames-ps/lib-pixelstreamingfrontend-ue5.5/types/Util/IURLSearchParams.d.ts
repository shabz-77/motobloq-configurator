/**
 * A case insensitive, partial implementation of URLSearchParams
 */
export declare class IURLSearchParams {
    _urlParams: Record<string, string>;
    constructor(search: string);
    has(name: string): boolean;
    get(name: string): string | null;
}
