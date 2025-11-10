"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorOverlay = void 0;
const TextOverlay_1 = require("./TextOverlay");
/**
 * Generic overlay used to show textual error info to the user.
 */
class ErrorOverlay extends TextOverlay_1.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const errorOverlayHtml = document.createElement('div');
        errorOverlayHtml.id = 'errorOverlay';
        errorOverlayHtml.className = 'textDisplayState';
        return errorOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const errorOverlayHtmlInner = document.createElement('div');
        errorOverlayHtmlInner.id = 'errorOverlayInner';
        return errorOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem - the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ErrorOverlay.createRootElement(), ErrorOverlay.createContentElement());
    }
}
exports.ErrorOverlay = ErrorOverlay;
//# sourceMappingURL=ErrorOverlay.js.map