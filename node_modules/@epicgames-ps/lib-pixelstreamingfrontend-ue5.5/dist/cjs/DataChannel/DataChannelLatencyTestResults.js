"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataChannelLatencyTestRecord = void 0;
class DataChannelLatencyTestRecord {
    constructor(request) {
        this.seq = request.Seq;
        this.playerSentTimestamp = Date.now();
        this.requestFillerSize = request.Filler ? request.Filler.length : 0;
    }
    update(response) {
        this.playerReceivedTimestamp = Date.now();
        this.streamerReceivedTimestamp = response.ReceivedTimestamp;
        this.streamerSentTimestamp = response.SentTimestamp;
        this.responseFillerSize = response.Filler ? response.Filler.length : 0;
    }
}
exports.DataChannelLatencyTestRecord = DataChannelLatencyTestRecord;
//# sourceMappingURL=DataChannelLatencyTestResults.js.map