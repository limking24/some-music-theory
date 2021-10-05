import { Scale } from '@tonaljs/tonal';

export interface NoteRange {
	ref: string;
	tonic: string;
	fromPosition: number;
	fromPitch: number;
	toPosition: number;
	toPitch: number;
}

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