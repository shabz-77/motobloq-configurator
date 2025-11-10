"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectOverlay = void 0;
const ActionOverlay_1 = require("./ActionOverlay");
/**
 * Overlay shown during connection, has a button that can be clicked to initiate a connection.
 */
class ConnectOverlay extends ActionOverlay_1.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const connectElem = document.createElement('div');
        connectElem.id = 'connectOverlay';
        connectElem.className = 'clickableState';
        return connectElem;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const connectContentElem = document.createElement('div');
        connectContentElem.id = 'connectButton';
        connectContentElem.innerHTML = 'Click to start';
        return connectContentElem;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem - the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ConnectOverlay.createRootElement(), ConnectOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}
exports.ConnectOverlay = ConnectOverlay;
//# sourceMappingURL=ConnectOverlay.js.map