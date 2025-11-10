"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebRTCSettings = exports.EncoderSettings = exports.PixelStreamingSettings = exports.InitialSettings = void 0;
/**
 * Latency Test Results Data
 */
class InitialSettings {
    constructor() {
        this.PixelStreamingSettings = new PixelStreamingSettings();
        this.EncoderSettings = new EncoderSettings();
        this.WebRTCSettings = new WebRTCSettings();
    }
    /**
     * Checks for compatibility with the FPS and MaxFPS stats between 4.27 and 5
     */
    ueCompatible() {
        if (this.WebRTCSettings.MaxFPS != null) {
            this.WebRTCSettings.FPS = this.WebRTCSettings.MaxFPS;
        }
    }
}
exports.InitialSettings = InitialSettings;
/**
 * A class for handling Pixel Streaming details
 */
class PixelStreamingSettings {
}
exports.PixelStreamingSettings = PixelStreamingSettings;
/**
 * A class for handling encoder stats
 */
class EncoderSettings {
}
exports.EncoderSettings = EncoderSettings;
/**
 * A class for handling web rtc stats
 */
class WebRTCSettings {
}
exports.WebRTCSettings = WebRTCSettings;
//# sourceMappingURL=InitialSettings.js.map