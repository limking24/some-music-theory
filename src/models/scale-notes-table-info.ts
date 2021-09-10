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

	public enharmonicOf(index: number): ScaleNotesTableRow | undefined {
		let enharmonicIndex = this.rows[index].enharmonicIndex;
		return (enharmonicIndex === -1) ? undefined : this.rows[enharmonicIndex];
	}

}