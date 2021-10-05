import { TonalJsScaleRefDao } from '@/data-access/tonaljs-scale-ref-dao';
import { Scale } from '@tonaljs/tonal';
import { Inject, Singleton } from 'typescript-ioc';
import { Optional } from 'typescript-optional';

export interface NoteRange {
	key: string;
	tonic: string;
	fromPosition: number;
	fromPitch: number;
	toPosition: number;
	toPitch: number;
}

export abstract class ScaleService {

	public abstract getNotesByTonics(key: string, tonics: string[]): Promise<Optional<string[][]>>;

	public abstract getNotesWithin(range: NoteRange): Promise<Optional<string[]>>;

}

@Singleton
export class TonalJsScaleService extends ScaleService {

	public constructor(@Inject private _refDao: TonalJsScaleRefDao) {
		super();
	}

	public async getNotesByTonics(key: string, tonics: string[]): Promise<Optional<string[][]>> {
		let ref = await this._refDao.getRef(key);
		if (ref.isPresent()) {
			return Optional.of(tonics.map(tonic => Scale
													.get(`${tonic} ${ref.get()}`)
													.notes));
		}
		return Optional.empty();
	}

	public async getNotesWithin(range: NoteRange): Promise<Optional<string[]>> {
		let ref = await this._refDao.getRef(range.key);
		if (ref.isPresent()) {
			let scale = `${range.tonic} ${ref.get()}`;
			let notes = Scale.get(scale).notes;
			let notesPerOctave = notes.length;
			if (range.fromPosition < notesPerOctave && range.toPosition < notesPerOctave) {
				let from = notes[range.fromPosition] + range.fromPitch;
				let to = notes[range.toPosition] + range.toPitch;
				return Optional.of(Scale
									.rangeOf(scale)(from, to)
									.map(note => note ? note : ''));
			}
		}
		return Optional.empty();
	}

}