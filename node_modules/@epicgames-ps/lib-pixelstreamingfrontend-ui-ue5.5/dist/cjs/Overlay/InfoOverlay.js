"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoOverlay = void 0;
const TextOverlay_1 = require("./TextOverlay");
/**
 * Generic overlay used to show textual info to the user.
 */
class InfoOverlay extends TextOverlay_1.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const infoOverlayHtml = document.createElement('div');
        infoOverlayHtml.id = 'infoOverlay';
        infoOverlayHtml.className = 'textDisplayState';
        return infoOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const infoOverlayHtmlInner = document.createElement('div');
        infoOverlayHtmlInner.id = 'messageOverlayInner';
        return infoOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem - the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, InfoOverlay.createRootElement(), InfoOverlay.createContentElement());
    }
}
exports.InfoOverlay = InfoOverlay;
//# sourceMappingURL=InfoOverlay.js.map