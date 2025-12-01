export declare class RTCUtils {
    static isVideoTransceiver(transceiver: RTCRtpTransceiver | undefined): boolean;
    static canTransceiverReceiveVideo(transceiver: RTCRtpTransceiver | undefined): boolean;
    static canTransceiverSendVideo(transceiver: RTCRtpTransceiver | undefined): boolean;
    static isAudioTransceiver(transceiver: RTCRtpTransceiver | undefined): boolean;
    static canTransceiverReceiveAudio(transceiver: RTCRtpTransceiver | undefined): boolean;
    static canTransceiverSendAudio(transceiver: RTCRtpTransceiver | undefined): boolean;
}
