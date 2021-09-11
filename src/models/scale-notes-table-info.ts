import { ScaleName } from './scale-name';
import { ScaleNotesTableRow } from './scale-notes-table-row';

export class ScaleNotesTableInfo {

	public constructor(private readonly _scaleName: ScaleName,
						private readonly _aliases: ScaleName[],
						public readonly rows: ScaleNotesTableRow[]) {}

	public get scaleName(): string {
		return this._scaleName.display;
	}

	public get numberOfAliases(): number {
		return this._aliases.length;
	}

	public get hasAliases(): boolean {
		return this.numberOfAliases > 0;
	}

	public get aliases(): string {
		return this._aliases
					.map(alias => alias.display)
					.join(', ');
	}

	public get notesPerOctave(): number {
		return this.rows[0].notes.length;
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