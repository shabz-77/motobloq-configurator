import { FullScreenIcon } from './FullscreenIcon';
import { SettingsIcon } from './SettingsIcon';
import { StatsIcon } from './StatsIcon';
import { XRIcon } from './XRIcon';
import { UIElementConfig } from '../UI/UIConfigurationTypes';
/**
 * Configures how UI elements to control the stream are created.
 * By default, a button will be created for each control. That can be overriden per-control
 * to use an externally provided element, or to disable the element entirely.
 */
export type ControlsUIConfiguration = {
    statsButtonType?: UIElementConfig;
    fullscreenButtonType?: UIElementConfig;
    settingsButtonType?: UIElementConfig;
    xrIconType?: UIElementConfig;
};
/**
 * Element containing various controls like stats, settings, fullscreen.
 */
export declare class Controls {
    statsIcon: StatsIcon;
    fullscreenIcon: FullScreenIcon;
    settingsIcon: SettingsIcon;
    xrIcon: XRIcon;
    _rootElement: HTMLElement;
    /**
     * Construct the controls
     */
    constructor(config?: ControlsUIConfiguration);
    /**
     * Get the element containing the controls.
     */
    get rootElement(): HTMLElement;
}
