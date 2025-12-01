import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { IInputController } from './IInputController';
import { Controller } from './GamepadTypes';
/**
 * Additional types for Window and Navigator
 */
declare global {
    interface Window {
        mozRequestAnimationFrame(callback: FrameRequestCallback): number;
        webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    }
    interface Navigator {
        webkitGetGamepads(): Gamepad[];
    }
}
/**
 * Gamepad layout codes enum
 */
export declare enum GamepadLayout {
    RightClusterBottomButton = 0,
    RightClusterRightButton = 1,
    RightClusterLeftButton = 2,
    RightClusterTopButton = 3,
    LeftShoulder = 4,
    RightShoulder = 5,
    LeftTrigger = 6,
    RightTrigger = 7,
    SelectOrBack = 8,
    StartOrForward = 9,
    LeftAnalogPress = 10,
    RightAnalogPress = 11,
    LeftClusterTopButton = 12,
    LeftClusterBottomButton = 13,
    LeftClusterLeftButton = 14,
    LeftClusterRightButton = 15,
    CentreButton = 16,
    LeftStickHorizontal = 0,
    LeftStickVertical = 1,
    RightStickHorizontal = 2,
    RightStickVertical = 3
}
/**
 * Handles gamepad events from the document to send to the streamer.
 */
export declare class GamepadController implements IInputController {
    controllers: Array<Controller>;
    streamMessageController: StreamMessageController;
    onGamepadConnectedListener: (event: GamepadEvent) => void;
    onGamepadDisconnectedListener: (event: GamepadEvent) => void;
    beforeUnloadListener: (event: Event) => void;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    constructor(streamMessageController: StreamMessageController);
    register(): void;
    unregister(): void;
    onGamepadResponseReceived(gamepadId: number): void;
    private onGamepadConnected;
    private onGamepadDisconnected;
    private scanGamepads;
    private updateStatus;
    private onBeforeUnload;
}
