import { ScaleTonicRange } from '@/data/scale-type';
import { Optional } from 'typescript-optional';
import { ScaleTonic } from './scale-tonic';

export class Row {

	public constructor(public readonly tonicIndex: number,
						public readonly notes: string[],
						public readonly range: ScaleTonicRange,
						public highlight = false) {}

	public get tonic(): string {
		return ScaleTonic.tonicOfIndex(this.tonicIndex);
	}

	public get enharmonic(): string {
		return Optional
				.ofNullable(ScaleTonic.enharmonicOfTonicIndex(this.tonicIndex))
				.orElse('-');
	}

	public get enharmonicIndex(): number {
		return ScaleTonic.indexOfTonic(this.enharmonic);
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

	public get gradualDim(): boolean {
		return this.tonicIndex + 1 == this.range.upper || 
				this.tonicIndex - 1 == this.range.lower
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