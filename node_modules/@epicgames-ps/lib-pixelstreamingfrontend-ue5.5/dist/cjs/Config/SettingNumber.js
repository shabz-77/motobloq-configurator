"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingNumber = void 0;
const SettingBase_1 = require("./SettingBase");
/**
 * A number setting object with a text label. Min and max limit the range of allowed values.
 */
class SettingNumber extends SettingBase_1.SettingBase {
    constructor(id, label, description, min, max, defaultNumber, useUrlParams, defaultOnChangeListener = () => {
        /* Do nothing, to be overridden. */
    }) {
        super(id, label, description, defaultNumber, defaultOnChangeListener);
        this._min = min;
        this._max = max;
        // attempt to read the number from the url params
        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.number = defaultNumber;
        }
        else {
            const parsedValue = Number.parseFloat(this.getURLParam(this.id));
            this.number = Number.isNaN(parsedValue) ? defaultNumber : parsedValue;
        }
        this.useUrlParams = useUrlParams;
    }
    getValueAsString() {
        return this.number.toString();
    }
    /**
     * Set the number value (will be clamped within range).
     */
    set number(newNumber) {
        this.value = this.clamp(newNumber);
    }
    /**
     * @returns The number stored.
     */
    get number() {
        return this.value;
    }
    /**
     * Clamps a number between the min and max values (inclusive).
     * @param inNumber The number to clamp.
     * @returns The clamped number.
     */
    clamp(inNumber) {
        if (this._min == null && this._max == null) {
            return inNumber;
        }
        else if (this._min == null) {
            return Math.min(this._max, inNumber);
        }
        else if (this._max == null) {
            return Math.max(this._min, inNumber);
        }
        else {
            return Math.max(Math.min(this._max, inNumber), this._min);
        }
    }
    /**
     * Returns the minimum value
     * @returns The minimum value
     */
    get min() {
        return this._min;
    }
    /**
     * Returns the maximum value
     * @returns The maximum value
     */
    get max() {
        return this._max;
    }
    /**
     * Add a change listener to the number object.
     */
    addOnChangedListener(onChangedFunc) {
        this.onChange = onChangedFunc;
    }
}
exports.SettingNumber = SettingNumber;
//# sourceMappingURL=SettingNumber.js.map