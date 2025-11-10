"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingText = void 0;
const SettingBase_1 = require("./SettingBase");
/**
 * A text setting object with a text label.
 */
class SettingText extends SettingBase_1.SettingBase {
    constructor(id, label, description, defaultTextValue, useUrlParams, defaultOnChangeListener = () => {
        /* Do nothing, to be overridden. */
    }) {
        super(id, label, description, defaultTextValue, defaultOnChangeListener);
        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.text = defaultTextValue;
        }
        else {
            // parse flag from url parameters
            this.text = this.getURLParam(this.id);
        }
        this.useUrlParams = useUrlParams;
    }
    getValueAsString() {
        return this.text;
    }
    /**
     * @return The setting's value.
     */
    get text() {
        return this.value;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set text(inValue) {
        this.value = inValue;
    }
}
exports.SettingText = SettingText;
//# sourceMappingURL=SettingText.js.map