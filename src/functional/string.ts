export function toTitleCase(value: string): string {
	return value
			.split(' ')
			.map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
			.join(' ');
}

export function rotateLeft(text: string, noOfChars = 0): string {
	let cutoff = noOfChars % text.length;
	return text.slice(cutoff) + text.slice(0, cutoff); 
}

export function rotateRight(text: string, noOfChars = 0): string {
	const cutoff = noOfChars % text.length;
	return rotateLeft(text, text.length - cutoff);
}