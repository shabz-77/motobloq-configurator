import { InputCoordTranslator } from '../Util/InputCoordTranslator';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { IInputController } from './IInputController';
interface FakeTouchFinger {
    id: number;
    x: number;
    y: number;
}
/**
 * Allows for the usage of fake touch events
 */
export declare class TouchControllerFake implements IInputController {
    streamMessageController: StreamMessageController;
    videoPlayer: VideoPlayer;
    coordinateConverter: InputCoordTranslator;
    fakeTouchFinger: FakeTouchFinger;
    videoElementParentClientRect: DOMRect;
    onTouchStartListener: (event: TouchEvent) => void;
    onTouchEndListener: (event: TouchEvent) => void;
    onTouchMoveListener: (event: TouchEvent) => void;
    constructor(streamMessageController: StreamMessageController, videoPlayer: VideoPlayer, coordinateConverter: InputCoordTranslator);
    register(): void;
    unregister(): void;
    private onTouchStart;
    private onTouchEnd;
    private onTouchMove;
}
export {};
