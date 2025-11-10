import { InboundRTPStats, InboundVideoStats, InboundAudioStats } from './InboundRTPStats';
import { InboundTrackStats } from './InboundTrackStats';
import { DataChannelStats } from './DataChannelStats';
import { CandidateStat } from './CandidateStat';
import { CandidatePairStats } from './CandidatePairStats';
import { RemoteOutboundRTPStats, OutboundRTPStats } from './OutBoundRTPStats';
import { SessionStats } from './SessionStats';
import { StreamStats } from './StreamStats';
import { CodecStats } from './CodecStats';
/**
 * The Aggregated Stats that is generated from the RTC Stats Report
 */
export declare class AggregatedStats {
    inboundVideoStats: InboundVideoStats;
    inboundAudioStats: InboundAudioStats;
    candidatePairs: Array<CandidatePairStats>;
    datachannelStats: DataChannelStats;
    localCandidates: Array<CandidateStat>;
    remoteCandidates: Array<CandidateStat>;
    outboundVideoStats: OutboundRTPStats;
    outboundAudioStats: OutboundRTPStats;
    remoteOutboundVideoStats: RemoteOutboundRTPStats;
    remoteOutboundAudioStats: RemoteOutboundRTPStats;
    sessionStats: SessionStats;
    streamStats: StreamStats;
    codecs: Map<string, CodecStats>;
    transportStats: RTCTransportStats;
    constructor();
    /**
     * Gather all the information from the RTC Peer Connection Report
     * @param rtcStatsReport - RTC Stats Report
     */
    processStats(rtcStatsReport: RTCStatsReport): void;
    /**
     * Process stream stats data from webrtc
     *
     * @param stat - the stats coming in from webrtc
     */
    handleStream(stat: StreamStats): void;
    /**
     * Process the Ice Candidate Pair Data
     * @param stat - the stats coming in from ice candidates
     */
    handleCandidatePair(stat: CandidatePairStats): void;
    /**
     * Process the Data Channel Data
     * @param stat - the stats coming in from the data channel
     */
    handleDataChannel(stat: DataChannelStats): void;
    /**
     * Process the Local Ice Candidate Data
     * @param stat - local stats
     */
    handleLocalCandidate(stat: CandidateStat): void;
    /**
     * Process the Remote Ice Candidate Data
     * @param stat - ice candidate stats
     */
    handleRemoteCandidate(stat: CandidateStat): void;
    /**
     * Process the Inbound RTP Audio and Video Data
     * @param stat - inbound rtp stats
     */
    handleInboundRTP(stat: InboundRTPStats): void;
    /**
     * Process the "local" outbound RTP Audio and Video stats.
     * @param stat - local outbound rtp stats
     */
    handleLocalOutbound(stat: OutboundRTPStats): void;
    /**
     * Process the "remote" outbound RTP Audio and Video stats.
     * @param stat - remote outbound rtp stats
     */
    handleRemoteOutbound(stat: RemoteOutboundRTPStats): void;
    /**
     * Process the Inbound Video Track Data
     * @param stat - video track stats
     */
    handleTrack(stat: InboundTrackStats): void;
    handleTransport(stat: RTCTransportStats): void;
    handleCodec(stat: CodecStats): void;
    handleSessionStatistics(videoStartTime: number, inputController: boolean | null, videoEncoderAvgQP: number): void;
    /**
     * Check if a value coming in from our stats is actually a number
     * @param value - the number to be checked
     */
    isNumber(value: unknown): boolean;
    /**
     * Helper function to return the active candidate pair
     * @returns The candidate pair that is currently receiving data
     */
    getActiveCandidatePair(): CandidatePairStats | null;
}
