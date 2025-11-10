"use strict";
// Copyright Epic Games, Inc. All Rights Reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingFlag = void 0;
const SettingBase_1 = require("./SettingBase");
/**
 * A boolean flag setting object with a text label.
 */
class SettingFlag extends SettingBase_1.SettingBase {
    constructor(id, label, description, defaultFlagValue, useUrlParams, defaultOnChangeListener = () => {
        /* Do nothing, to be overridden. */
    }) {
        super(id, label, description, defaultFlagValue, defaultOnChangeListener);
        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.flag = defaultFlagValue;
        }
        else {
            // parse flag from url parameters
            const urlParamFlag = this.getURLParam(this.id);
            this.flag = urlParamFlag.toLowerCase() != 'false';
        }
        this.useUrlParams = useUrlParams;
    }
    getValueAsString() {
        return this.flag ? 'true' : 'false';
    }
    /**
     * Enables this flag.
     */
    enable() {
        this.flag = true;
    }
    /**
     * @return The setting's value.
     */
    get flag() {
        return !!this.value;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set flag(inValue) {
        this.value = inValue;
    }
}
exports.SettingFlag = SettingFlag;
//# sourceMappingURL=SettingFlag.js.map