import { InputCoordTranslator } from '../Util/InputCoordTranslator';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import { IInputController } from './IInputController';
/**
 * The basic touch controller that handles the touch events on the document.
 */
export declare class TouchController implements IInputController {
    streamMessageController: StreamMessageController;
    videoPlayer: VideoPlayer;
    coordinateConverter: InputCoordTranslator;
    videoElementParent: HTMLVideoElement;
    fingers: number[];
    fingerIds: Map<any, any>;
    maxByteValue: number;
    onTouchStartListener: (event: TouchEvent) => void;
    onTouchEndListener: (event: TouchEvent) => void;
    onTouchMoveListener: (event: TouchEvent) => void;
    constructor(streamMessageController: StreamMessageController, videoPlayer: VideoPlayer, coordinateConverter: InputCoordTranslator);
    register(): void;
    unregister(): void;
    private rememberTouch;
    private forgetTouch;
    private onTouchStart;
    private onTouchEnd;
    private onTouchMove;
    private emitTouchData;
}
