"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelStreamingEventEmitter = exports.WebRtcTCPRelayDetectedEvent = exports.PlayerCountEvent = exports.XrFrameEvent = exports.XrSessionEndedEvent = exports.XrSessionStartedEvent = exports.SettingsChangedEvent = exports.InitialSettingsEvent = exports.SubscribeFailedEvent = exports.DataChannelLatencyTestResultEvent = exports.DataChannelLatencyTestResponseEvent = exports.ShowOnScreenKeyboardEvent = exports.LatencyCalculatedEvent = exports.LatencyTestResultEvent = exports.StreamerIDChangedMessageEvent = exports.StreamerListMessageEvent = exports.StatsReceivedEvent = exports.HideFreezeFrameEvent = exports.LoadFreezeFrameEvent = exports.PlayStreamRejectedEvent = exports.PlayStreamEvent = exports.PlayStreamErrorEvent = exports.StreamReconnectEvent = exports.StreamPreDisconnectEvent = exports.StreamPreConnectEvent = exports.StreamLoadingEvent = exports.VideoInitializedEvent = exports.DataChannelErrorEvent = exports.DataChannelCloseEvent = exports.DataChannelOpenEvent = exports.WebRtcDisconnectedEvent = exports.WebRtcFailedEvent = exports.WebRtcConnectedEvent = exports.WebRtcConnectingEvent = exports.WebRtcAutoConnectEvent = exports.WebRtcSdpOfferEvent = exports.WebRtcSdpAnswerEvent = exports.WebRtcSdpEvent = exports.VideoEncoderAvgQPEvent = exports.AfkTimedOutEvent = exports.AfkWarningDeactivateEvent = exports.AfkWarningUpdateEvent = exports.AfkWarningActivateEvent = void 0;
/**
 * An event that is emitted when AFK disconnect is about to happen.
 * Can be cancelled by calling the callback function provided as part of the event.
 */
class AfkWarningActivateEvent extends Event {
    constructor(data) {
        super('afkWarningActivate');
        this.data = data;
    }
}
exports.AfkWarningActivateEvent = AfkWarningActivateEvent;
/**
 * An event that is emitted when the AFK disconnect countdown is updated.
 */
class AfkWarningUpdateEvent extends Event {
    constructor(data) {
        super('afkWarningUpdate');
        this.data = data;
    }
}
exports.AfkWarningUpdateEvent = AfkWarningUpdateEvent;
/**
 * An event that is emitted when AFK warning is deactivated.
 */
class AfkWarningDeactivateEvent extends Event {
    constructor() {
        super('afkWarningDeactivate');
    }
}
exports.AfkWarningDeactivateEvent = AfkWarningDeactivateEvent;
/**
 * An event that is emitted when AFK countdown reaches 0 and the user is disconnected.
 */
class AfkTimedOutEvent extends Event {
    constructor() {
        super('afkTimedOut');
    }
}
exports.AfkTimedOutEvent = AfkTimedOutEvent;
/**
 * An event that is emitted when we receive new video quality value.
 */
class VideoEncoderAvgQPEvent extends Event {
    constructor(data) {
        super('videoEncoderAvgQP');
        this.data = data;
    }
}
exports.VideoEncoderAvgQPEvent = VideoEncoderAvgQPEvent;
/**
 * An event that is emitted after a WebRtc connection has been negotiated.
 */
class WebRtcSdpEvent extends Event {
    constructor() {
        super('webRtcSdp');
    }
}
exports.WebRtcSdpEvent = WebRtcSdpEvent;
/**
 * An event that is emitted after the SDP answer is set.
 */
class WebRtcSdpAnswerEvent extends Event {
    constructor(data) {
        super('webRtcSdpAnswer');
        this.data = data;
    }
}
exports.WebRtcSdpAnswerEvent = WebRtcSdpAnswerEvent;
/**
 * An event that is emitted after the SDP offer is set.
 */
class WebRtcSdpOfferEvent extends Event {
    constructor(data) {
        super('webRtcSdpOffer');
        this.data = data;
    }
}
exports.WebRtcSdpOfferEvent = WebRtcSdpOfferEvent;
/**
 * An event that is emitted when auto connecting.
 */
class WebRtcAutoConnectEvent extends Event {
    constructor() {
        super('webRtcAutoConnect');
    }
}
exports.WebRtcAutoConnectEvent = WebRtcAutoConnectEvent;
/**
 * An event that is emitted when sending a WebRtc offer.
 */
class WebRtcConnectingEvent extends Event {
    constructor() {
        super('webRtcConnecting');
    }
}
exports.WebRtcConnectingEvent = WebRtcConnectingEvent;
/**
 * An event that is emitted when WebRtc connection has been established.
 */
class WebRtcConnectedEvent extends Event {
    constructor() {
        super('webRtcConnected');
    }
}
exports.WebRtcConnectedEvent = WebRtcConnectedEvent;
/**
 * An event that is emitted if WebRtc connection has failed.
 */
class WebRtcFailedEvent extends Event {
    constructor() {
        super('webRtcFailed');
    }
}
exports.WebRtcFailedEvent = WebRtcFailedEvent;
/**
 * An event that is emitted if WebRtc connection is disconnected.
 */
class WebRtcDisconnectedEvent extends Event {
    constructor(data) {
        super('webRtcDisconnected');
        this.data = data;
    }
}
exports.WebRtcDisconnectedEvent = WebRtcDisconnectedEvent;
/**
 * An event that is emitted when RTCDataChannel is opened.
 */
class DataChannelOpenEvent extends Event {
    constructor(data) {
        super('dataChannelOpen');
        this.data = data;
    }
}
exports.DataChannelOpenEvent = DataChannelOpenEvent;
/**
 * An event that is emitted when RTCDataChannel is closed.
 */
class DataChannelCloseEvent extends Event {
    constructor(data) {
        super('dataChannelClose');
        this.data = data;
    }
}
exports.DataChannelCloseEvent = DataChannelCloseEvent;
/**
 * An event that is emitted on RTCDataChannel errors.
 */
class DataChannelErrorEvent extends Event {
    constructor(data) {
        super('dataChannelError');
        this.data = data;
    }
}
exports.DataChannelErrorEvent = DataChannelErrorEvent;
/**
 * An event that is emitted when the video stream has been initialized.
 */
class VideoInitializedEvent extends Event {
    constructor() {
        super('videoInitialized');
    }
}
exports.VideoInitializedEvent = VideoInitializedEvent;
/**
 * An event that is emitted when video stream loading starts.
 */
class StreamLoadingEvent extends Event {
    constructor() {
        super('streamLoading');
    }
}
exports.StreamLoadingEvent = StreamLoadingEvent;
/**
 * An event that is emitted when video stream loading has finished.
 */
class StreamPreConnectEvent extends Event {
    constructor() {
        super('streamConnect');
    }
}
exports.StreamPreConnectEvent = StreamPreConnectEvent;
/**
 * An event that is emitted when video stream has stopped.
 */
class StreamPreDisconnectEvent extends Event {
    constructor() {
        super('streamDisconnect');
    }
}
exports.StreamPreDisconnectEvent = StreamPreDisconnectEvent;
/**
 * An event that is emitted when video stream is reconnecting.
 */
class StreamReconnectEvent extends Event {
    constructor() {
        super('streamReconnect');
    }
}
exports.StreamReconnectEvent = StreamReconnectEvent;
/**
 * An event that is emitted if there are errors loading the video stream.
 */
class PlayStreamErrorEvent extends Event {
    constructor(data) {
        super('playStreamError');
        this.data = data;
    }
}
exports.PlayStreamErrorEvent = PlayStreamErrorEvent;
/**
 * An event that is emitted before trying to start video playback.
 */
class PlayStreamEvent extends Event {
    constructor() {
        super('playStream');
    }
}
exports.PlayStreamEvent = PlayStreamEvent;
/**
 * An event that is emitted if the browser rejects video playback. Can happen for example if
 * video auto-play without user interaction is refused by the browser.
 */
class PlayStreamRejectedEvent extends Event {
    constructor(data) {
        super('playStreamRejected');
        this.data = data;
    }
}
exports.PlayStreamRejectedEvent = PlayStreamRejectedEvent;
/**
 * An event that is emitted when receiving a full FreezeFrame image from UE.
 */
class LoadFreezeFrameEvent extends Event {
    constructor(data) {
        super('loadFreezeFrame');
        this.data = data;
    }
}
exports.LoadFreezeFrameEvent = LoadFreezeFrameEvent;
/**
 * An event that is emitted when receiving UnfreezeFrame message from UE and video playback is about to be resumed.
 */
class HideFreezeFrameEvent extends Event {
    constructor() {
        super('hideFreezeFrame');
    }
}
exports.HideFreezeFrameEvent = HideFreezeFrameEvent;
/**
 * An event that is emitted when receiving WebRTC statistics.
 */
class StatsReceivedEvent extends Event {
    constructor(data) {
        super('statsReceived');
        this.data = data;
    }
}
exports.StatsReceivedEvent = StatsReceivedEvent;
/**
 * An event that is emitted when streamer list changes.
 */
class StreamerListMessageEvent extends Event {
    constructor(data) {
        super('streamerListMessage');
        this.data = data;
    }
}
exports.StreamerListMessageEvent = StreamerListMessageEvent;
/**
 * An event that is emitted when a subscribed to streamer's id changes.
 */
class StreamerIDChangedMessageEvent extends Event {
    constructor(data) {
        super('StreamerIDChangedMessage');
        this.data = data;
    }
}
exports.StreamerIDChangedMessageEvent = StreamerIDChangedMessageEvent;
/**
 * An event that is emitted when receiving latency test results.
 */
class LatencyTestResultEvent extends Event {
    constructor(data) {
        super('latencyTestResult');
        this.data = data;
    }
}
exports.LatencyTestResultEvent = LatencyTestResultEvent;
/**
 * An event that is emitted everytime latency is calculated using the WebRTC stats API.
 */
class LatencyCalculatedEvent extends Event {
    constructor(data) {
        super('latencyCalculated');
        this.data = data;
    }
}
exports.LatencyCalculatedEvent = LatencyCalculatedEvent;
/**
 * An event that is emitted when we receive the "onScreenKeyboard" command from UE.
 */
class ShowOnScreenKeyboardEvent extends Event {
    constructor(data) {
        super('showOnScreenKeyboard');
        this.data = data;
    }
}
exports.ShowOnScreenKeyboardEvent = ShowOnScreenKeyboardEvent;
/**
 * An event that is emitted when receiving data channel latency test response from server.
 * This event is handled by DataChannelLatencyTestController
 */
class DataChannelLatencyTestResponseEvent extends Event {
    constructor(data) {
        super('dataChannelLatencyTestResponse');
        this.data = data;
    }
}
exports.DataChannelLatencyTestResponseEvent = DataChannelLatencyTestResponseEvent;
/**
 * An event that is emitted when data channel latency test results are ready.
 */
class DataChannelLatencyTestResultEvent extends Event {
    constructor(data) {
        super('dataChannelLatencyTestResult');
        this.data = data;
    }
}
exports.DataChannelLatencyTestResultEvent = DataChannelLatencyTestResultEvent;
class SubscribeFailedEvent extends Event {
    constructor(data) {
        super('subscribeFailed');
        this.data = data;
    }
}
exports.SubscribeFailedEvent = SubscribeFailedEvent;
/**
 * An event that is emitted when receiving initial settings from UE.
 */
class InitialSettingsEvent extends Event {
    constructor(data) {
        super('initialSettings');
        this.data = data;
    }
}
exports.InitialSettingsEvent = InitialSettingsEvent;
/**
 * An event that is emitted when PixelStreaming settings change.
 */
class SettingsChangedEvent extends Event {
    constructor(data) {
        super('settingsChanged');
        this.data = data;
    }
}
exports.SettingsChangedEvent = SettingsChangedEvent;
/**
 * Event emitted when an XR Session starts
 */
class XrSessionStartedEvent extends Event {
    constructor() {
        super('xrSessionStarted');
    }
}
exports.XrSessionStartedEvent = XrSessionStartedEvent;
/**
 * Event emitted when an XR Session ends
 */
class XrSessionEndedEvent extends Event {
    constructor() {
        super('xrSessionEnded');
    }
}
exports.XrSessionEndedEvent = XrSessionEndedEvent;
/**
 * Event emitted when an XR Frame is complete
 */
class XrFrameEvent extends Event {
    constructor(data) {
        super('xrFrame');
        this.data = data;
    }
}
exports.XrFrameEvent = XrFrameEvent;
/**
 * An event that is emitted when receiving a player count from the signalling server
 */
class PlayerCountEvent extends Event {
    constructor(data) {
        super('playerCount');
        this.data = data;
    }
}
exports.PlayerCountEvent = PlayerCountEvent;
/**
 * An event that is emitted when the webRTC connections is relayed over TCP.
 */
class WebRtcTCPRelayDetectedEvent extends Event {
    constructor() {
        super('webRtcTCPRelayDetected');
    }
}
exports.WebRtcTCPRelayDetectedEvent = WebRtcTCPRelayDetectedEvent;
class PixelStreamingEventEmitter extends EventTarget {
    /**
     * Dispatch a new event.
     * @param e event
     * @returns
     */
    dispatchEvent(e) {
        return super.dispatchEvent(e);
    }
    /**
     * Register an event handler.
     * @param type event name
     * @param listener event handler function
     */
    addEventListener(type, listener) {
        super.addEventListener(type, listener);
    }
    /**
     * Remove an event handler.
     * @param type event name
     * @param listener event handler function
     */
    removeEventListener(type, listener) {
        super.removeEventListener(type, listener);
    }
}
exports.PixelStreamingEventEmitter = PixelStreamingEventEmitter;
//# sourceMappingURL=EventEmitter.js.map