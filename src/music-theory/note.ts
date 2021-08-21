function changeAccidentalTo(pitchNotation: string, to: string): string {
	return pitchNotation.charAt(0) + to + pitchNotation.charAt(pitchNotation.length - 1);
}

export function removeAccidental(pitchNotation: string): string {
	return changeAccidentalTo(pitchNotation, '');
}

export function indicateAsNatural(pitchNotation: string): string {
	return changeAccidentalTo(pitchNotation, 'n');
}

export function indicateAsSharp(pitchNotation: string): string {
	return changeAccidentalTo(pitchNotation, '#');
}