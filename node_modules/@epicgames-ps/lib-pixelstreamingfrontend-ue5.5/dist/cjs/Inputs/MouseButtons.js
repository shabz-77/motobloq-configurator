"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseButtonsMask = exports.MouseButton = void 0;
/**
 * Mouse Button Data
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button}
 */
class MouseButton {
}
exports.MouseButton = MouseButton;
MouseButton.mainButton = 0; // Left button.
MouseButton.auxiliaryButton = 1; // Wheel button.
MouseButton.secondaryButton = 2; // Right button.
MouseButton.fourthButton = 3; // Browser Back button.
MouseButton.fifthButton = 4; // Browser Forward button.
/**
 * Mouse Button Mask Data
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons}
 */
class MouseButtonsMask {
}
exports.MouseButtonsMask = MouseButtonsMask;
MouseButtonsMask.primaryButton = 1; // Left button.
MouseButtonsMask.secondaryButton = 2; // Right button.
MouseButtonsMask.auxiliaryButton = 4; // Wheel button.
MouseButtonsMask.fourthButton = 8; // Browser Back button.
MouseButtonsMask.fifthButton = 16; // Browser Forward button.
//# sourceMappingURL=MouseButtons.js.map