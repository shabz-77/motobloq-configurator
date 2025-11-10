"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingUIFlag = void 0;
const SettingUIBase_1 = require("./SettingUIBase");
class SettingUIFlag extends SettingUIBase_1.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = setting.label;
        this.flag = setting.flag;
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
            this._settingsTextElem.innerText = this.setting._label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get checkbox() {
        if (!this._checkbox) {
            this._checkbox = document.createElement('input');
            this._checkbox.type = 'checkbox';
            // Block keypress/up/down propogation from text field typing going to UE
            this._checkbox.addEventListener('keypress', (event) => {
                event.stopPropagation();
            });
            this._checkbox.addEventListener('keyup', (event) => {
                event.stopPropagation();
            });
            this._checkbox.addEventListener('keydown', (event) => {
                event.stopPropagation();
            });
        }
        return this._checkbox;
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
            wrapperLabel.classList.add('tgl-switch');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.checkbox.title = this.setting.description;
            this.checkbox.classList.add('tgl');
            this.checkbox.classList.add('tgl-flat');
            const slider = document.createElement('div');
            slider.classList.add('tgl-slider');
            wrapperLabel.appendChild(this.checkbox);
            wrapperLabel.appendChild(slider);
            // setup on change from checkbox
            this.checkbox.addEventListener('change', () => {
                if (this.setting.flag !== this.checkbox.checked) {
                    this.setting.flag = this.checkbox.checked;
                    this.setting.updateURLParams();
                }
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue - The new value for the setting.
     */
    set flag(inValue) {
        this.checkbox.checked = inValue;
    }
    /**
     * Get value
     */
    get flag() {
        return this.checkbox.checked;
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
        this.checkbox.disabled = true;
    }
    enable() {
        this.checkbox.disabled = false;
    }
}
exports.SettingUIFlag = SettingUIFlag;
//# sourceMappingURL=SettingUIFlag.js.map