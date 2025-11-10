/**
 * Declare additions to base types for cross browser fullscreen functionality.
 */
declare global {
    interface Document {
        webkitIsFullScreen?: boolean;
        mozFullScreen?: boolean;
        webkitFullscreenEnabled?: boolean;
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
    }
    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        webkitEnterFullscreen?: () => void;
    }
}
/**
 * Base class for an element (i.e. button) that, when clicked, will toggle fullscreen of a given element.
 * Can be initialized with any HTMLElement, if it is set as rootElement in the constructor.
 */
export declare class FullScreenIconBase {
    isFullscreen: boolean;
    fullscreenElement: HTMLElement | HTMLVideoElement;
    _rootElement: HTMLElement;
    get rootElement(): HTMLElement;
    set rootElement(element: HTMLElement);
    constructor();
    /**
     * Makes the document or fullscreenElement fullscreen.
     */
    toggleFullscreen(): void;
    /**
     * Handles the fullscreen button on change
     */
    onFullscreenChange(): void;
}
/**
 * An implementation of FullScreenIconBase that uses an externally
 * provided HTMLElement for toggling full screen.
 */
export declare class FullScreenIconExternal extends FullScreenIconBase {
    constructor(externalButton: HTMLElement);
}
/**
 * The default fullscreen icon that contains a button and svgs for each state.
 */
export declare class FullScreenIcon extends FullScreenIconBase {
    _maximizeIcon: SVGElement;
    _minimizeIcon: SVGElement;
    _tooltipText: HTMLElement;
    constructor();
    get tooltipText(): HTMLElement;
    get maximizeIcon(): SVGElement;
    get minimizeIcon(): SVGElement;
    onFullscreenChange(): void;
}
