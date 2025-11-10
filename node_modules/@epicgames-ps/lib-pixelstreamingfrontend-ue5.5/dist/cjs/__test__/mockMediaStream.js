"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockHTMLMediaElement = exports.unmockMediaStream = exports.mockMediaStream = exports.MockMediaStreamTrackImpl = exports.MockMediaStreamImpl = void 0;
class MockMediaStreamImpl {
    constructor(data) {
        //
    }
    addTrack(track) {
        throw new Error("Method not implemented.");
    }
    clone() {
        throw new Error("Method not implemented.");
    }
    getAudioTracks() {
        throw new Error("Method not implemented.");
    }
    getTrackById(trackId) {
        throw new Error("Method not implemented.");
    }
    getTracks() {
        throw new Error("Method not implemented.");
    }
    getVideoTracks() {
        throw new Error("Method not implemented.");
    }
    removeTrack(track) {
        throw new Error("Method not implemented.");
    }
    addEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event) {
        throw new Error("Method not implemented.");
    }
}
exports.MockMediaStreamImpl = MockMediaStreamImpl;
class MockMediaStreamTrackImpl {
    constructor() {
        this.kind = 'video';
        this.readyState = 'live';
    }
    applyConstraints(constraints) {
        throw new Error("Method not implemented.");
    }
    clone() {
        throw new Error("Method not implemented.");
    }
    getCapabilities() {
        throw new Error("Method not implemented.");
    }
    getConstraints() {
        throw new Error("Method not implemented.");
    }
    getSettings() {
        throw new Error("Method not implemented.");
    }
    stop() {
        throw new Error("Method not implemented.");
    }
    addEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event) {
        throw new Error("Method not implemented.");
    }
}
exports.MockMediaStreamTrackImpl = MockMediaStreamTrackImpl;
const mockHTMLMediaElementPlay = (ableToPlay) => {
    if (ableToPlay) {
        return Promise.resolve();
    }
    return Promise.reject("mock cancel");
};
const originalMediaStream = global.MediaStream;
const originalMediaStreamTrack = global.MediaStreamTrack;
const mockMediaStream = () => {
    global.MediaStream = MockMediaStreamImpl;
    global.MediaStreamTrack = MockMediaStreamTrackImpl;
};
exports.mockMediaStream = mockMediaStream;
const unmockMediaStream = () => {
    global.MediaStream = originalMediaStream;
    global.MediaStreamTrack = originalMediaStreamTrack;
};
exports.unmockMediaStream = unmockMediaStream;
const mockHTMLMediaElement = (options) => {
    const { ableToPlay, readyState } = options;
    jest.spyOn(HTMLMediaElement.prototype, 'play').mockReturnValue(mockHTMLMediaElementPlay(ableToPlay));
    if (readyState !== undefined) {
        jest.spyOn(HTMLMediaElement.prototype, 'readyState', 'get').mockReturnValue(readyState);
    }
};
exports.mockHTMLMediaElement = mockHTMLMediaElement;
//# sourceMappingURL=mockMediaStream.js.map