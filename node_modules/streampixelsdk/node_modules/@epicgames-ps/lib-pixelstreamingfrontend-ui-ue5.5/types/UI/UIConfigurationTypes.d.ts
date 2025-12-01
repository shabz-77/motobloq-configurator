/** Whether a stream UI element is internally made, externally provided, or disabled. */
export declare enum UIElementCreationMode {
    CreateDefaultElement = 0,
    UseCustomElement = 1,
    Disable = 2
}
/** A configuration for different UI elements which control/display info related to the stream. */
export type UIElementConfig = {
    creationMode: UIElementCreationMode;
    customElement?: HTMLElement;
};
/**
 * Configures a general stream-related UI panel.
 * For example: is it created, and if it is, what kind of button is used to show/hide it.
 * This configuration is used for the settings panel and stats panel by default.
 *
 * Note: For cases where the panel needs to be created, but a button isn't needed,
 * the panel element can be placed anywhere in the DOM as needed (see Application class).
 */
export type PanelConfiguration = {
    isEnabled: boolean;
    visibilityButtonConfig?: UIElementConfig;
};
export declare function isPanelEnabled(config: PanelConfiguration | undefined): boolean;
