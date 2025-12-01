/**
 * The interface for controllers
 */
export interface Controller {
    currentState: Gamepad;
    prevState: Gamepad;
    id: number | undefined;
}
/**
 * Deep copies the values from a gamepad by first converting it to a JSON object and then back to a gamepad
 *
 * @param gamepad the original gamepad
 * @returns a new gamepad object, populated with the original gamepads values
 */
export declare function deepCopyGamepad(gamepad: Gamepad): Gamepad;
