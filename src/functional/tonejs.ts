const NoteExcludeFlat = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];

/**
 * Used to locate a note in NoteExcludeFlat. For example:
 * 
 * 1. Cb = 3 (C) + -1 (b) = 2, i.e. NoteExcludeFlat[2] (B)  
 * 2. B### = 14 (G) + 1 (#) + 1 (#) + 1 (#) = 17, i.e. NoteExcludeFlat[17] (D)
 */
const Values: Record<string, number> = {
	'b': -1,
	'#': 1,
	'C': 3,
	'D': 5,
	'E': 7,
	'F': 8,
	'G': 10,
	'A': 12,
	'B': 14
}

/**
 * Re-denote a pitch notation so that it can be played by tonejs, which
 * does not support triple flat/sharp and uses 'x' to represent a double 
 * sharp instead of '##'.
 * 
 * Cb4 => B3  
 * E##3 => F#3  
 * B###3 => D4
 */
export function redenote(pitchNotation: string): string {
	let note = pitchNotation.slice(0, -1);
	let index = [...note].reduce((index, letter) => index + Values[letter], 0);
	let pitch = Number(pitchNotation.slice(-1));
	if (index < 3) {
		pitch--;
	} else if (index > 14) {
		pitch++;
	}
	return NoteExcludeFlat[index] + pitch;
}

/**
 * Re-denote notes/chords so that it can be played by tonejs, which
 * does not support triple flat/sharp and uses 'x' to represent a double 
 * sharp instead of '##'.
 * 
 * Cb4 => B3  
 * E##3 => F#3  
 * B###3 => D4
 * 
 */
export function redenoteAll(pitchNotation: (string|string[])[]): (string|string[])[] {
	return pitchNotation.map(current => typeof current === 'string' ?
											redenote(current) :						// note
											current.map(note => redenote(note)));	// chord
}