import type { FlagsIds } from './Config';
import { SettingBase } from './SettingBase';
/**
 * A boolean flag setting object with a text label.
 */
export declare class SettingFlag<CustomIds extends string = FlagsIds> extends SettingBase {
    id: FlagsIds | CustomIds;
    onChangeEmit: (changedValue: boolean) => void;
    constructor(id: FlagsIds | CustomIds, label: string, description: string, defaultFlagValue: boolean, useUrlParams: boolean, defaultOnChangeListener?: (changedValue: unknown, setting: SettingBase) => void);
    protected getValueAsString(): string;
    /**
     * Enables this flag.
     */
    enable(): void;
    /**
     * @return The setting's value.
     */
    get flag(): boolean;
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set flag(inValue: boolean);
}
