import { ScaleTonic } from '@/models/scale-tonic';
import { Scale } from '@tonaljs/tonal';

export interface NoteRange {
	ref: string;
	tonic: string;
	fromPosition: number;
	fromPitch: number;
	toPosition: number;
	toPitch: number;
}

/**
 * Example:
 * ```
 * getNotesWithin({
 *    ref: 'major',
 *    tonic: 'C',
 *    fromPosition: 0,
 *    fromPitch: 4,
 *    toPosition: 2,
 *    toPitch: 5
 * })
 * // ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
 * ```
 */
export function getNotesWithin(range: NoteRange): string[] {
		let scale = `${range.tonic} ${range.ref}`;
		let notes = Scale.get(scale).notes;
		let notesPerOctave = notes.length;
		if (range.fromPosition < notesPerOctave && range.toPosition < notesPerOctave) {
			let from = notes[range.fromPosition] + range.fromPitch;
			let to = notes[range.toPosition] + range.toPitch;
			return Scale
					.rangeOf(scale)(from, to)
					.map(note => note ? note : '');
		}
	return [];
}

/**
 * ```
 * allTonicsNotes('major');
 * // [
 * //   ['Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb'],
 * //   ...
 * //   ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
 * //   ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 
 * //   ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
 * //   ...
 * //   ['B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##']
 * // ]
 * ```
 */
export function allTonicsNotes(ref: String): string[][] {
	return ScaleTonic.Entries.map(entry => Scale.get(`${entry[1]} ${ref}`).notes);
}

/**
 * Change the given scale notes to pitch notations and add the tonic 
 * note to the end.
 * 
 * Example:
 * ```
 * asDemonstration(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
 * // ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
 * asDemonstration(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
 * // ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4']
 * ```
 */
export function asDemonstration(scaleNotes: string[]): string[] {
	let notes = [...scaleNotes, scaleNotes[0]];
	let startPitch = notes[0].charCodeAt(0) < 67 ? 3 : 4; // A, A#, B = 3, Others = 4
	let endPitch = startPitch + 1;
	let index = notes.findIndex((note, i) => note.charCodeAt(0) < 67 && notes[i + 1].charCodeAt(0) >= 67);
	if (index === -1) {
		index = notes.length - 2;
	}
	return notes.map((note, i) => (i <= index) ? `${note}${startPitch}` : `${note}${endPitch}`);
}