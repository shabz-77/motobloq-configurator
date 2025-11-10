import { AggregatedStats } from './AggregatedStats';
/**
 * FrameTimingInfo is a Chromium-specific set of WebRTC stats useful for latency calculation. It is stored in WebRTC stats as `googTimingFrameInfo`.
 * It is defined as an RTP header extension here: https://webrtc.googlesource.com/src/+/refs/heads/main/docs/native-code/rtp-hdrext/video-timing/README.md
 * It is defined in source code here: https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/api/video/video_timing.cc;l=82;drc=8d399817282e3c12ed54eb23ec42a5e418298ec6
 * It is discussed by its author here: https://github.com/w3c/webrtc-provisional-stats/issues/40#issuecomment-1272916692
 * In summary it a comma-delimited string that contains the following (in this order):
 * 1)  RTP timestamp: the RTP timestamp of the frame
 * 2)  Capture time: timestamp when this frame was captured
 * 3)  Encode start: timestamp when this frame started to be encoded
 * 4)  Encode finish: timestamp when this frame finished encoding
 * 5)  Packetization finish: timestamp when this frame was split into packets and was ready to be sent over the network
 * 6)  Pacer exit: timestamp when last packet of this frame was sent over the network by the sender at this timestamp
 * 7)  Network timestamp1: place for the SFU to mark when the frame started being forwarded. Application specific.
 * 8)  Network timestamp2: place for the SFU to mark when the frame finished being forwarded. Application specific.
 * 9)  Receive start: timestamp when the first packet of this frame was received
 * 10) Receive finish: timestamp when the last packet of this frame was received
 * 11) Decode start:  timestamp when the frame was passed to decoder
 * 12) Decode finish:  timestamp when the frame was decoded
 * 13) Render time:  timestamp of the projected render time for this frame
 * 14) "is outlier": a flag for if this frame is bigger in encoded size than the average frame by at least 5x.
 * 15) "triggered by timer": a flag for if this report was triggered by the timer (The report is sent every 200ms)
 */
export declare class FrameTimingInfo {
    rtpTimestamp: number;
    captureTimestamp: number;
    encodeStartTimestamp: number;
    encodeFinishTimestamp: number;
    packetizerFinishTimestamp: number;
    pacerExitTimestamp: number;
    networkTimestamp1: number;
    networkTimestamp2: number;
    receiveStart: number;
    receiveFinish: number;
    decodeStart: number;
    decodeFinish: number;
    renderTime: number;
    isOutlier: boolean;
    isTriggeredByTimer: boolean;
    encoderLatencyMs: number;
    packetizeLatencyMs: number;
    pacerLatencyMs: number;
    captureToSendLatencyMs: number;
}
/**
 * Calculates a combination of latency statistics using purely WebRTC API.
 */
export declare class LatencyCalculator {
    private latestSenderRecvClockOffset;
    calculate(stats: AggregatedStats, receivers: RTCRtpReceiver[]): LatencyInfo;
    private extractFrameTimingInfo;
    private calculateSenderLatency;
    /**
     * Find the first valid ssrc or csrc that has capture time fields present from abs-capture-time header extension.
     * @param receivers The RTP receviers this peer connection has.
     * @returns A single valid ssrc or csrc that has capture time fields or null if there is none (e.g. in non-chromium browsers it will be null).
     */
    private getCaptureSource;
    private calculateSenderReceiverClockOffset;
    private getRTTMs;
}
/**
 * A collection of latency information calculated using the WebRTC API.
 * Most stats are calculated following the spec:
 * https://w3c.github.io/webrtc-stats/#dictionary-rtcinboundrtpstreamstats-members
 */
export declare class LatencyInfo {
    /**
     * The time taken from the moment a frame is done capturing to the moment it is sent over the network.
     * Note: This can only be calculated if both offer and answer contain the
     * the RTP header extension for `video-timing` (Chrome only for now)
     */
    senderLatencyMs: number | undefined;
    /**
     * The time taken from the moment a frame is done capturing to the moment it is sent over the network.
     * Note: This can only be calculated if both offer and answer contain the
     * the RTP header extension for `abs-capture-time` (Chrome only for now)
     */
    senderLatencyAbsCaptureTimeMs: number | undefined;
    rttMs: number | undefined;
    averageProcessingDelayMs: number | undefined;
    averageJitterBufferDelayMs: number | undefined;
    averageDecodeLatencyMs: number | undefined;
    averageAssemblyDelayMs: number | undefined;
    averageE2ELatency: number | undefined;
    frameTiming: FrameTimingInfo | undefined;
}
