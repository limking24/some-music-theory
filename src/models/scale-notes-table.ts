import { ScaleTonicRange } from '@/data/scale-type';

export const Tonic = ['Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];

export const EnharmonicEquivalent = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', '-', '-', '-', 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'];

export class Row {

	public constructor(public readonly tonicIndex: number,
						public readonly notes: string[],
						public readonly range: ScaleTonicRange,
						public highlight = false) {}

	public get tonic(): string {
		return Tonic[this.tonicIndex];
	}

	public get enharmonic(): string {
		return EnharmonicEquivalent[this.tonicIndex];
	}

	public get enharmonicIndex(): number {
		return Tonic.indexOf(this.enharmonic);
	}

	public get accidentals(): string {
		return this.notes
					.map(note => note.slice(1))
					.filter(accidental => accidental != '')
					.join(',');
	}

	public get dim(): boolean {
		return this.tonicIndex < this.range.upper || 
				this.tonicIndex > this.range.lower;
	}

	public toggleHighlight(): void {
		this.highlight = !this.highlight;
	}

}

export class Table {
	
	public constructor(public readonly scaleName: string,
						private readonly _aliases: string[],
						public readonly notesPerOctave: number,
						public readonly rows: Row[]) {}

	public get numberOfAliases(): number {
		return this._aliases.length;
	}

	public get hasAliases(): boolean {
		return this.numberOfAliases > 0;
	}

	public get aliases(): string {
		return this._aliases.join(', ');
	}

	/**
	* Highlight or unhighlight a particular scale and its enharmonic equivalent
	* if it has any. For example, C's enharmonic equivalent is B#, so when 
	* highlighting the C scale row, B# will also be highlighted.
	* 
	* @param index row index of a particular scale
	*/
	public toggleHighlight(index: number): void {
		this.rows[index].toggleHighlight();
		let enharmonicIndex = this.rows[index].enharmonicIndex;
		if (enharmonicIndex > -1) {
			this.rows[enharmonicIndex].toggleHighlight();
		}
	}

}