# @rbxts/axis

roblox-ts typings for [axis](https://neond00m.github.io/Axis/)

## Deviations

### Map<T>

```diff
- export type Map<T> = { [any]: any }
+ export type _Map<T> = Map<defined, T> | defined[];
```

### InputConstructor

```diff
- export type InputConstructor = <T>(Map<T> | (Map<T> & { deadzone: number? })) -> Input<T>
+ export type InputConstructor = <T>(keyMap: _Map<T>, deadzone?: number) => Input<T>;
```
### Input Constructor function

```diff
- local function new<T>(inputMap: types.Map<T> & { deadzone: number? }): types.Input<T>
+ local function new<T>(inputMap: types.Map<T>, deadzone: number?): types.Input<T>
    local input: types.Input<T> = {
		vector = false,
		current = {},
		previous = {},
		active = {
			{}, -- separate input axes for each controller
		},
		resets = {}, --resets input on next update
		connections = {},
		inputMap = inputMap,
-       deadzone = inputMap.deadzone
+       deadzone = deadzone,

		read = read,
		pressing = pressing,
		pressed = pressed,
		released = released,
		changed = changed,
		hold = hold,
		map = map,
		update = update,
		move = move,
	}
	map(input, inputMap)

	return input
end
```

## Examples

```ts
input(
	new Map<Enum.KeyCode, Vector3>([
		[Enum.KeyCode.Up, new Vector3(0, 1, 0)],
		[Enum.KeyCode.Down, new Vector3(0, -1, 0)],
		[Enum.KeyCode.Left, new Vector3(-1, 0, 0)],
		[Enum.KeyCode.Right, new Vector3(1, 0, 0)],
	]),
, 1);

input([Enum.KeyCode.W, Enum.KeyCode.A, Enum.KeyCode.S, Enum.KeyCode.D], 1);
```

