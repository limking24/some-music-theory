import { ScaleTonicRange } from './scale-tonic-range';

const tonic = ['Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];

const enharmonic = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', '-', '-', '-', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'];

export class ScaleNotesTableRow {

	public constructor(public readonly index: number,
						public readonly notes: string[],
						public readonly range: ScaleTonicRange,
						public highlight = false) {}

	public get tonic(): string {
		return tonic[this.index];
	}

	public get enharmonic(): string {
		return enharmonic[this.index];
	}

	public get accidentals(): string {
		return this.notes
					.map(note => note.slice(1))
					.filter(accidental => accidental != '')
					.join(',');
	}

	public get dim(): boolean {
		return this.range.outOfRange(this.index);
	}

}