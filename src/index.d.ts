export namespace Axis {
	/**
	 * @within Axis
	 * @type DeviceType "Desktop" | "Touch" | "Controller"
	 */
	type DeviceType = "Desktop" | "Touch" | "Controller";

	/**
	 * @within Axis
	 * @type Map<T> { [Enum | string]: T } & { Enum.KeyCode | Enum.UserInputType }
	 */
	type _Map<T> = Map<Enum | string, T> & Array<Enum.KeyCode | Enum.UserInputType>;

	interface Input<T> {
		read: (controller?: number) => LuaTuple<[T, T]>;
		pressing: (controller?: number) => boolean;
		pressed: (controller?: number) => boolean;
		released: (controller?: number) => boolean;
		changed: (controller?: number) => boolean;
		hold: (value: T, controller?: number) => void;
		move: (value: T, controller?: number) => void;
		map: (keyMap: _Map<T>) => void;
		update: () => void;

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

	type InputConstructor = <T>(input: _Map<T> | (_Map<T> & { deadzone?: number })) => Input<T>;

	interface Axis {
		device: (inputType: Enum.UserInputType | undefined) => DeviceType;
		update: (inputs: Map<defined, Input<defined>>) => void;
		input: InputConstructor;
	}

	function input<T>(inputMap: (_Map<T> & { deadzone?: number }) | _Map<T>): Input<T>;

	function update(inputs: Map<defined, Input<defined>>): void;

	function device(input?: Enum.UserInputType): DeviceType;
}
