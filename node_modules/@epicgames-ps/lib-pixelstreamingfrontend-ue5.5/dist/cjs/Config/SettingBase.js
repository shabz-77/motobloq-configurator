"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingBase = void 0;
/**
 * Base class for a setting that has a text label and an arbitrary setting value it stores.
 */
class SettingBase {
    constructor(id, label, description, defaultSettingValue, defaultOnChangeListener = () => {
        /* Do nothing, to be overridden. */
    }) {
        this.parseURLParams();
        this.onChange = defaultOnChangeListener;
        this.onChangeEmit = () => {
            /* Do nothing, to be overridden. */
        };
        this.id = id;
        this.description = description;
        this.label = label;
        this.value = defaultSettingValue;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this._label = inLabel;
        this.onChangeEmit(this._value);
    }
    /**
     * @returns The label text for the setting.
     */
    get label() {
        return this._label;
    }
    /**
     * @return The setting's value.
     */
    get value() {
        return this._value;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set value(inValue) {
        this._value = inValue;
        this.onChange(this._value, this);
        this.onChangeEmit(this._value);
    }
    /**
     * Persist the setting value in URL.
     */
    updateURLParams() {
        if (this.useUrlParams) {
            // set url params
            const urlParams = new URLSearchParams(window.location.search);
            const valueString = this.getValueAsString();
            let set = false;
            for (const [name, _value] of urlParams) {
                if (name.toLowerCase() == this.id.toLowerCase()) {
                    urlParams.set(name, valueString);
                    set = true;
                    break;
                }
            }
            if (!set) {
                urlParams.set(this.id, valueString);
            }
            window.history.replaceState({}, '', urlParams.toString() !== '' ? `${location.pathname}?${urlParams}` : `${location.pathname}`);
        }
    }
    /**
     * Allows sub types to provide their value for the url search params.
     */
    getValueAsString() {
        return '';
    }
    parseURLParams() {
        this._urlParams = {};
        const params = new URLSearchParams(window.location.search);
        for (const [name, value] of params) {
            this._urlParams[name.toLowerCase()] = value;
        }
    }
    hasURLParam(name) {
        return name.toLowerCase() in this._urlParams;
    }
    getURLParam(name) {
        if (this.hasURLParam(name)) {
            return this._urlParams[name.toLowerCase()];
        }
        return '';
    }
}
exports.SettingBase = SettingBase;
//# sourceMappingURL=SettingBase.js.map