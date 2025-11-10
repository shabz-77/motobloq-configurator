/**
 * ICE Candidate Stat collected from the RTC Stats Report
 */
export declare class CandidateStat {
    address: string;
    candidateType: string;
    id: string;
    label: string;
    port: number;
    protocol: 'tcp' | 'udp';
    relayProtocol: 'tcp' | 'udp' | 'tls';
    transportId: string;
}
