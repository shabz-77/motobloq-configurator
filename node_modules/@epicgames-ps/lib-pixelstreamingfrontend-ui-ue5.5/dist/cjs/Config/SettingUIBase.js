"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingUIBase = void 0;
/**
 * Base class for a setting that has a text label, an arbitrary setting value it stores, an a HTML element that represents this setting.
 */
class SettingUIBase {
    constructor(setting) {
        this._setting = setting;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
        }
        return this._rootElement;
    }
}
exports.SettingUIBase = SettingUIBase;
//# sourceMappingURL=SettingUIBase.js.map