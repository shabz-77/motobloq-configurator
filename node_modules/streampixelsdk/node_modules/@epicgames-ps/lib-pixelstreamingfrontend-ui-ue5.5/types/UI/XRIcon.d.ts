/**
 * XR icon that can be clicked.
 */
export declare class XRIcon {
    _rootElement: HTMLButtonElement;
    _xrIcon: SVGElement;
    _tooltipText: HTMLElement;
    /**
     * Get the the button containing the XR icon.
     */
    get rootElement(): HTMLButtonElement;
    get tooltipText(): HTMLElement;
    get xrIcon(): SVGElement;
}
