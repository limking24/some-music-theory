import { Scale as ScaleModel } from '@/models/scale';
import { Scale as ScaleInfo } from '@tonaljs/scale';
import { Scale as ScaleUtil } from '@tonaljs/tonal';
import { getScaleInfo } from './scale';

export type NotePosition = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface NoteFormatter {
	format: (note: string | undefined, position: NotePosition) => string | undefined;
}

export class ScaleNoteBuilder {

	private _fromNotePosition: NotePosition = 0;

	private _fromPitch = 4;

	private _toNotePosition: NotePosition = 6;

	private _toPitch = 4;

	private _formatter?: NoteFormatter;

	private constructor(private scale: ScaleInfo) {}

	public static of(scale: ScaleModel | ScaleInfo): ScaleNoteBuilder {
		return new ScaleNoteBuilder((scale instanceof ScaleModel) ? getScaleInfo(scale) : scale);
	}

	public fromNotePosition(position: NotePosition): this {
		this._fromNotePosition = position;
		return this;
	}

	public fromPitch(pitch: number): this {
		this._fromPitch = pitch;
		return this;
	}

	public toNotePosition(position: NotePosition): this {
		this._toNotePosition = position;
		return this;
	}

	public toPitch(pitch: number): this {
		this._toPitch = pitch;
		return this;
	}

	public formatter(formatter: NoteFormatter): this {
		this._formatter = formatter;
		return this;
	}

	public create(): (string | undefined)[] {
		let fromNote = this.scale.notes[this._fromNotePosition] + this._fromPitch;
		let toNote = this.scale.notes[this._toNotePosition] + this._toPitch;
		let notes = ScaleUtil.rangeOf(this.scale.name)(fromNote, toNote);

		if (this._formatter != undefined) {
			notes = notes.map((note, index) => this._formatter!.format!(
				note, 
				(index + this._fromNotePosition) % 7 as NotePosition)
			);
		}

		return notes;
	}

}