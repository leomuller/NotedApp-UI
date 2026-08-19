export interface TodoColorPair {
	key: string;
	label: string;
	/** Main, vivid color. */
	code: string;
	/** Duller shade of `code`, used for the completed state (lighter, instead of duller, for black). */
	shadeCode: string;
}

// code = not-completed color, shadeCode = completed color (duller, except black which is lighter)
export const TODO_COLOR_PAIRS: TodoColorPair[] = [
	{ key: 'red', label: 'Red', code: '#e53935', shadeCode: '#c16b69' },
	{ key: 'orange', label: 'Orange', code: '#fb8c00', shadeCode: '#cc954f' },
	{ key: 'yellow', label: 'Yellow', code: '#fdd835', shadeCode: '#cdbb69' },
	{ key: 'green', label: 'Green', code: '#43a047', shadeCode: '#709f73' },
	{ key: 'blue', label: 'Blue', code: '#1e88e5', shadeCode: '#5e93c1' },
	{ key: 'purple', label: 'Purple', code: '#8e24aa', shadeCode: '#9661a4' },
	{ key: 'pink', label: 'Pink', code: '#d81b60', shadeCode: '#bb5d7f' },
	{ key: 'black', label: 'Black', code: '#212121', shadeCode: '#757575' },
];

export function todoColorPair(key: string): TodoColorPair {
	return TODO_COLOR_PAIRS.find((pair) => pair.key === key) ?? TODO_COLOR_PAIRS.find((pair) => pair.key === 'blue')!;
}
