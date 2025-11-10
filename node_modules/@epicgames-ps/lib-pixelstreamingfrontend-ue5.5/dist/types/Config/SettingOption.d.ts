import type { OptionParametersIds } from './Config';
import { SettingBase } from './SettingBase';
/**
 * An Option setting object with a text label. Allows you to specify an array of options and select one of them.
 */
export declare class SettingOption<CustomIds extends string = OptionParametersIds> extends SettingBase {
    id: OptionParametersIds | CustomIds;
    onChangeEmit: (changedValue: string) => void;
    _options: Array<string>;
    _urlParamResolver: (urlParamValue: string) => string;
    constructor(id: OptionParametersIds | CustomIds, label: string, description: string, defaultTextValue: string, options: Array<string>, useUrlParams: boolean, defaultUrlParamResolver?: (urlParamValue: string) => string, defaultOnChangeListener?: (changedValue: unknown, setting: SettingBase) => void);
    protected getValueAsString(): string;
    /**
     * Add a change listener to the select element.
     */
    addOnChangedListener(onChangedFunc: (newValue: string) => void): void;
    /**
     * @returns All available options as an array
     */
    get options(): Array<string>;
    /**
     * Set options
     * @param values Array of options
     */
    set options(values: Array<string>);
    /**
     * @returns Selected option as a string
     */
    get selected(): string;
    /**
     * Set selected option if it matches one of the available options
     * @param value Selected option
     */
    set selected(value: string);
    /**
     * Set the url parameter resolver to do some transformation to the string value
     * that is extracted from the url parameters.
     * @param urlParam A function that transforms the extracted url parameter string for this setting to something else.
     */
    set urlParamResolver(value: (urlParam: string) => string);
}
