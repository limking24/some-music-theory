export function remove<T>(array: T[], target: T): void {
	let index = array.indexOf(target);
	if (index > -1) {
		array.splice(index, 1);
	}
}