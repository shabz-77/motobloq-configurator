"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverlayBase = void 0;
/**
 * Class for the base overlay structure
 */
class OverlayBase {
    /**
     * Construct an overlay
     * @param rootDiv - the root element this overlay will be inserted into
     * @param rootElement - the root element that is the overlay
     */
    constructor(rootDiv, rootElement, textElement) {
        this.rootDiv = rootDiv;
        this.rootElement = rootElement;
        this.textElement = textElement;
        this.rootElement.appendChild(this.textElement);
        this.hide();
        this.rootDiv.appendChild(this.rootElement);
    }
    /**
     * Show the overlay
     */
    show() {
        this.rootElement.classList.remove('hiddenState');
    }
    /**
     * Hide the overlay
     */
    hide() {
        this.rootElement.classList.add('hiddenState');
    }
}
exports.OverlayBase = OverlayBase;
//# sourceMappingURL=BaseOverlay.js.map