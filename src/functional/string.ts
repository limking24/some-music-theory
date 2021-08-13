export function includesIgnoreCase(strings: string[], target: string): boolean {
	let index = strings.findIndex(string => string.toLowerCase() === target.toLowerCase());
	return index !== -1;
}

export function toTitleCase(text: string) {
	return text
			.split(' ')
			.map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
			.join(' ');
}