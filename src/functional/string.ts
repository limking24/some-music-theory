export function toTitleCase(value: string): string {
	return value
			.split(' ')
			.map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
			.join(' ');
}