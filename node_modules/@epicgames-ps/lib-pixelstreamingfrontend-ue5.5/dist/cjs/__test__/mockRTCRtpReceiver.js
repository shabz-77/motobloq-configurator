"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmockRTCRtpReceiver = exports.mockRTCRtpReceiver = exports.mockRTCRtpReceiverImpl = void 0;
exports.mockRTCRtpReceiverImpl = {
    prototype: jest.fn(),
    getCapabilities: () => ({
        codecs: [
            {
                clockRate: 60,
                mimeType: "testMimeType",
                sdpFmtpLine: "AV1"
            }
        ],
        headerExtensions: []
    })
};
const originalRTCRtpReceiver = global.RTCRtpReceiver;
const mockRTCRtpReceiver = () => {
    global.RTCRtpReceiver = exports.mockRTCRtpReceiverImpl;
};
exports.mockRTCRtpReceiver = mockRTCRtpReceiver;
const unmockRTCRtpReceiver = () => {
    global.RTCRtpReceiver = originalRTCRtpReceiver;
};
exports.unmockRTCRtpReceiver = unmockRTCRtpReceiver;
//# sourceMappingURL=mockRTCRtpReceiver.js.map