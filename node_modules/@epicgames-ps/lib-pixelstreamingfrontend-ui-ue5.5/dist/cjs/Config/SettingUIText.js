"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingUIText = void 0;
const SettingUIBase_1 = require("./SettingUIBase");
class SettingUIText extends SettingUIBase_1.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.text = this.setting.text;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get textbox() {
        if (!this._textbox) {
            this._textbox = document.createElement('input');
            this._textbox.classList.add('form-control');
            this._textbox.type = 'textbox';
        }
        return this._textbox;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.textbox.title = this.setting.description;
            wrapperLabel.appendChild(this.textbox);
            // setup on change from checkbox
            this.textbox.addEventListener('input', (event) => {
                if (this.setting.text !== this.textbox.value) {
                    this.setting.text = this.textbox.value;
                    this.setting.updateURLParams();
                }
                event.stopPropagation();
            });
            // Block keypress/up/down propogation from text field typing going to UE
            this.textbox.addEventListener('keypress', (event) => {
                event.stopPropagation();
            });
            this.textbox.addEventListener('keyup', (event) => {
                event.stopPropagation();
            });
            this.textbox.addEventListener('keydown', (event) => {
                event.stopPropagation();
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue - The new value for the setting.
     */
    set text(inValue) {
        this.textbox.value = inValue;
    }
    /**
     * Get value
     */
    get text() {
        return this.textbox.value;
    }
    /**
     * Set the label text for the setting.
     * @param label - setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
    disable() {
        this.textbox.disabled = true;
    }
    enable() {
        this.textbox.disabled = false;
    }
}
exports.SettingUIText = SettingUIText;
//# sourceMappingURL=SettingUIText.js.map