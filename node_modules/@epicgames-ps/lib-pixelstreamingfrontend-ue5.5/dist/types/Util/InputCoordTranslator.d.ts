export interface RectSize {
    width: number;
    height: number;
}
export interface TranslatedCoordUnsigned {
    inRange: boolean;
    x: number;
    y: number;
}
export interface TranslatedCoordSigned {
    x: number;
    y: number;
}
export interface UntranslatedCoordUnsigned {
    x: number;
    y: number;
}
/**
 * Converts coordinates from element relative coordinates to values normalized within the value range of a short (and back again)
 */
export declare class InputCoordTranslator {
    playerSize: RectSize;
    ratio: number;
    playerIsLarger: boolean;
    reconfigure(playerSize: RectSize, videoSize: RectSize): void;
    translateUnsigned(x: number, y: number): TranslatedCoordUnsigned;
    translateSigned(x: number, y: number): TranslatedCoordSigned;
    untranslateUnsigned(x: number, y: number): UntranslatedCoordUnsigned;
}
