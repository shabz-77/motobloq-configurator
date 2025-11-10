import { ActiveKeys } from './InputClassesFactory';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { Config } from '../Config/Config';
import { IInputController } from './IInputController';
/**
 * Handles the Keyboard Inputs for the document
 */
export declare class KeyboardController implements IInputController {
    streamMessageController: StreamMessageController;
    activeKeys: ActiveKeys;
    config: Config;
    onKeyDownListener: (event: KeyboardEvent) => void;
    onKeyUpListener: (event: KeyboardEvent) => void;
    onKeyPressListener: (event: KeyboardEvent) => void;
    constructor(streamMessageController: StreamMessageController, config: Config, activeKeys: ActiveKeys);
    register(): void;
    unregister(): void;
    private handleOnKeyDown;
    private handleOnKeyUp;
    private handleOnKeyPress;
    /**
     * Gets the Keycode of the Key pressed
     * @param keyboardEvent - Key board Event
     * @returns - the key code of the Key
     */
    private getKeycode;
    /**
     * Browser keys do not have a charCode so we only need to test keyCode.
     * @param keyCode - the browser keycode number
     */
    private isKeyCodeBrowserKey;
}
