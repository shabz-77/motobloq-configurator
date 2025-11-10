"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteOutboundRTPStats = exports.OutboundRTPStats = void 0;
/**
 * Outbound RTP stats collected from the RTC Stats Report under `outbound-rtp`.
 * Wrapper around: https://developer.mozilla.org/en-US/docs/Web/API/RTCOutboundRtpStreamStats
 * These are stats for video we are sending to a remote peer.
 */
class OutboundRTPStats {
}
exports.OutboundRTPStats = OutboundRTPStats;
/**
 * Remote outbound stats collected from the RTC Stats Report under `remote-outbound-rtp`.
 * Wrapper around: https://developer.mozilla.org/en-US/docs/Web/API/RTCRemoteOutboundRtpStreamStats
 * These are stats for media we are receiving from a remote peer.
 */
class RemoteOutboundRTPStats {
}
exports.RemoteOutboundRTPStats = RemoteOutboundRTPStats;
//# sourceMappingURL=OutBoundRTPStats.js.map