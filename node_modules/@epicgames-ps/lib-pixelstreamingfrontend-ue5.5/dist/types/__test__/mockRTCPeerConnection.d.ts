export interface MockRTCPeerConnectionSpyFunctions {
    constructorSpy: null | ((config: RTCConfiguration) => void);
    closeSpy: null | (() => void);
    setRemoteDescriptionSpy: null | ((description: RTCSessionDescriptionInit) => void);
    setLocalDescriptionSpy: null | ((description: RTCLocalSessionDescriptionInit) => void);
    createAnswerSpy: null | (() => void);
    addTransceiverSpy: null | ((trackOrKind: string | MediaStreamTrack, init?: RTCRtpTransceiverInit | undefined) => void);
    addIceCandidateSpy: null | ((candidate: RTCIceCandidateInit) => void);
    sendDataSpy: null | ((data: ArrayBuffer) => void);
}
export interface MockRTCPeerConnectionTriggerFunctions {
    triggerIceConnectionStateChange: null | ((state: RTCIceConnectionState) => void);
    triggerOnTrack: null | ((data: RTCTrackEventInit) => void);
    triggerOnIceCandidate: null | ((data: RTCPeerConnectionIceEventInit) => void);
    triggerOnDataChannel: null | ((data: RTCDataChannelEventInit) => void);
}
export declare class MockRTCPeerConnectionImpl implements RTCPeerConnection {
    canTrickleIceCandidates: boolean | null;
    connectionState: RTCPeerConnectionState;
    currentLocalDescription: RTCSessionDescription | null;
    currentRemoteDescription: RTCSessionDescription | null;
    iceConnectionState: RTCIceConnectionState;
    iceGatheringState: RTCIceGatheringState;
    localDescription: RTCSessionDescription | null;
    pendingLocalDescription: RTCSessionDescription | null;
    pendingRemoteDescription: RTCSessionDescription | null;
    remoteDescription: RTCSessionDescription | null;
    sctp: RTCSctpTransport | null;
    signalingState: RTCSignalingState;
    _dataChannels: RTCDataChannel[];
    constructor(config: RTCConfiguration);
    onconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    ondatachannel: ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any) | null;
    onicecandidate: ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any) | null;
    onicecandidateerror: ((this: RTCPeerConnection, ev: Event) => any) | null;
    oniceconnectionstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onicegatheringstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onnegotiationneeded: ((this: RTCPeerConnection, ev: Event) => any) | null;
    onsignalingstatechange: ((this: RTCPeerConnection, ev: Event) => any) | null;
    ontrack: ((this: RTCPeerConnection, ev: RTCTrackEvent) => any) | null;
    addIceCandidate(candidate?: RTCIceCandidateInit | undefined): Promise<void>;
    addIceCandidate(candidate: RTCIceCandidateInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
    addTrack(track: MediaStreamTrack, ...streams: MediaStream[]): RTCRtpSender;
    addTransceiver(trackOrKind: string | MediaStreamTrack, init?: RTCRtpTransceiverInit | undefined): RTCRtpTransceiver;
    createAnswer(options?: RTCAnswerOptions | undefined): Promise<RTCSessionDescriptionInit>;
    createAnswer(successCallback: RTCSessionDescriptionCallback, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
    createDataChannel(label: string, dataChannelDict?: RTCDataChannelInit | undefined): RTCDataChannel;
    createOffer(options?: RTCOfferOptions | undefined): Promise<RTCSessionDescriptionInit>;
    createOffer(successCallback: RTCSessionDescriptionCallback, failureCallback: RTCPeerConnectionErrorCallback, options?: RTCOfferOptions | undefined): Promise<void>;
    getConfiguration(): RTCConfiguration;
    getReceivers(): RTCRtpReceiver[];
    getSenders(): RTCRtpSender[];
    getStats(selector?: MediaStreamTrack | null | undefined): Promise<RTCStatsReport>;
    getTransceivers(): RTCRtpTransceiver[];
    removeTrack(sender: RTCRtpSender): void;
    restartIce(): void;
    setConfiguration(configuration?: RTCConfiguration | undefined): void;
    setLocalDescription(description?: RTCLocalSessionDescriptionInit | undefined): Promise<void>;
    setLocalDescription(description: RTCLocalSessionDescriptionInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
    setRemoteDescription(description: RTCSessionDescriptionInit): Promise<void>;
    setRemoteDescription(description: RTCSessionDescriptionInit, successCallback: VoidFunction, failureCallback: RTCPeerConnectionErrorCallback): Promise<void>;
    addEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener<K extends keyof RTCPeerConnectionEventMap>(type: K, listener: (this: RTCPeerConnection, ev: RTCPeerConnectionEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    dispatchEvent(event: Event): boolean;
    static generateCertificate(keygenAlgorithm: AlgorithmIdentifier): Promise<RTCCertificate>;
    close(): void;
    triggerIceConnectionStateChange(state: RTCIceConnectionState): void;
    triggerOnTrack(data: RTCTrackEventInit): void;
    triggerOnIceCandidate(data: RTCPeerConnectionIceEventInit): void;
    triggerOnDataChannel(data: RTCDataChannelEventInit): void;
}
export declare class MockRTCIceCandidateImpl implements RTCIceCandidate {
    address: string | null;
    candidate: string;
    component: RTCIceComponent | null;
    foundation: string | null;
    port: number | null;
    priority: number | null;
    protocol: RTCIceProtocol | null;
    relatedAddress: string | null;
    relatedPort: number | null;
    sdpMLineIndex: number | null;
    sdpMid: string | null;
    tcpType: RTCIceTcpCandidateType | null;
    type: RTCIceCandidateType | null;
    usernameFragment: string | null;
    constructor(options?: RTCIceCandidateInit);
    toJSON(): RTCIceCandidateInit;
}
export declare class MockRTCDataChannelImpl implements RTCDataChannel {
    binaryType: BinaryType;
    bufferedAmount: number;
    bufferedAmountLowThreshold: number;
    id: number | null;
    label: string;
    maxPacketLifeTime: number | null;
    maxRetransmits: number | null;
    negotiated: boolean;
    ordered: boolean;
    protocol: string;
    readyState: RTCDataChannelState;
    constructor();
    onbufferedamountlow: ((this: RTCDataChannel, ev: Event) => any) | null;
    onclose: ((this: RTCDataChannel, ev: Event) => any) | null;
    onclosing: ((this: RTCDataChannel, ev: Event) => any) | null;
    onerror: ((this: RTCDataChannel, ev: Event) => any) | null;
    onmessage: ((this: RTCDataChannel, ev: MessageEvent<any>) => any) | null;
    onopen: ((this: RTCDataChannel, ev: Event) => any) | null;
    close(): void;
    send(data: string): void;
    send(data: Blob): void;
    send(data: ArrayBuffer): void;
    send(data: ArrayBufferView): void;
    addEventListener<K extends keyof RTCDataChannelEventMap>(type: K, listener: (this: RTCDataChannel, ev: RTCDataChannelEventMap[K]) => any, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener<K extends keyof RTCDataChannelEventMap>(type: K, listener: (this: RTCDataChannel, ev: RTCDataChannelEventMap[K]) => any, options?: boolean | EventListenerOptions | undefined): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined): void;
    dispatchEvent(event: Event): boolean;
}
export declare class MockRTCDataChannelEventImpl extends Event implements RTCDataChannelEvent {
    channel: RTCDataChannel;
    constructor(name: string, data: RTCDataChannelEventInit);
}
export declare class MockRTCTrackEventImpl extends Event implements RTCTrackEvent {
    receiver: RTCRtpReceiver;
    streams: readonly MediaStream[];
    track: MediaStreamTrack;
    transceiver: RTCRtpTransceiver;
    constructor(name: string, data: RTCTrackEventInit);
}
export declare const mockRTCPeerConnection: () => [MockRTCPeerConnectionSpyFunctions, MockRTCPeerConnectionTriggerFunctions];
export declare const unmockRTCPeerConnection: () => void;
