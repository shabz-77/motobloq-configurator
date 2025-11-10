export declare class EditConfirmedEvent extends CustomEvent<String> {
    confirmedText: string;
    constructor(confirmedText: string);
}
/**
 * A modal that is shown when a UE widget is touched on mobile.
 * or
 * A hidden (offscreen) input field that is shown on non-touch devices (e.g. Desktop)
 * when a UE widget is clicked. The hidden text field is used so non-latin character
 * input can be composed using IME assistance (which requires an input field).
 *
 * The reason this modal is required is that on mobile typing uses
 * an on-screen keyboard, which requires a valid input text area/input
 * to be focused to summon it. Therefore we show this modal which has
 * the contents of the UE widget, populate its text area with the contents
 * of the UE widget, then focus the text area to finally summon the native
 * on-screen keyboard.
 *
 * The modal also contains:
 * 1) A cancel button - this closes the modal
 * 2) A confirm button - this submits the edit back to the UE side
 */
export declare class EditTextModal {
    _rootElement: HTMLElement;
    _innerModal: HTMLElement;
    _editTextHeading: HTMLElement;
    _textArea: HTMLTextAreaElement;
    _modalBtnContainer: HTMLElement;
    _cancelBtn: HTMLButtonElement;
    _confirmBtn: HTMLButtonElement;
    _events: EventTarget;
    constructor();
    get events(): EventTarget;
    showModal(existingTextAreaContents: string): void;
    /**
     * Get the root element that contains either the modal (mobile) or hidden text input (desktop)
     */
    get rootElement(): HTMLElement;
    get innerModal(): HTMLElement;
    get editTextHeading(): HTMLElement;
    get textArea(): HTMLTextAreaElement;
    get modalBtnContainer(): HTMLElement;
    get cancelBtn(): HTMLElement;
    get confirmBtn(): HTMLElement;
}
