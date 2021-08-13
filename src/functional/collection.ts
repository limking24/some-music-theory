export function toMapWithLowercaseKey(array: string[]): Map<string, string> {
	let map = new Map<string, string>();
	array.forEach(item => map.set(item.toLowerCase(), item));
	return map;
}