export type DeviceType = "Desktop" | "Touch" | "Controller";

export type _Map<T> = Map<defined, T> | defined[];

export interface Input<T> {
	/**
	 * Reads current and previous values for the axis
	 *
	 * ```ts
	 * const [current, previous] = attack.read()
	 * ```
	 *
	 * @param controller
	 */
	read(controller?: number): LuaTuple<[T, T]>;
	pressing(controller?: number): boolean;
	pressed(controller?: number): boolean;
	released(controller?: number): boolean;
	changed(controller?: number): boolean;
	hold(value: T, controller?: number): void;
	move(value: T, controller?: number): void;
	map(keyMap: _Map<T>): void;
	update(): void;

	deadzone?: number;
	vector: boolean;
	current: T[];
	previous: T[];
	active: Array<Map<defined, T>>;
	resets: Map<defined, defined>;
	connections: RBXScriptConnection[];
	keyMap: _Map<T>;
	inputMap: Map<Enum.KeyCode | Enum.UserInputType, T>;
}

export type InputConstructor = <T>(keyMap: _Map<T>, deadzone?: number) => Input<T>;

/**
 * Gets the device of the provided UserInputType (or the last UserInputType if none is provided)
 * @param inputType UserInputType
 * @returns "Desktop" "Touch" or "Controller"
 */
export function device(inputType?: Enum.UserInputType): DeviceType;

/**
 * Updates all input axes in a array
 *
 * @param inputs A array of `Input` to update,
 */
export function update(inputs: Input<unknown>[]): void;

/**
 * Creates a new input axis with the provided keymap
 *
 * @param keyMap It can be a `Map<Enum.KeyCode | string, defined | number>` for deadzone or `Map<Enum.KeyCode, defined>` or Enum.KeyCode[]
 * @returns The input axis
 */
export const input: InputConstructor;
