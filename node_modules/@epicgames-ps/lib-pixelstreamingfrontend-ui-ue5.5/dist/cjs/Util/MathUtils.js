"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
class MathUtils {
    /**
     * formats Bytes coming in for video stats
     * @param bytes - number to convert
     * @param decimals - number of decimal places
     */
    static formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0';
        }
        const factor = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
        const i = Math.floor(Math.log(bytes) / Math.log(factor));
        return parseFloat((bytes / Math.pow(factor, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
exports.MathUtils = MathUtils;
//# sourceMappingURL=MathUtils.js.map