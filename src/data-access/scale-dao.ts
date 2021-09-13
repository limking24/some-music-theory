import { ScaleType } from '@/models/scale-type';
import { Inject, Singleton } from 'typescript-ioc';
import { SMTDB } from './database';

export abstract class ScaleDao {

	// public abstract nonChromaticNames(): Promise<ScaleName[]>;

	public abstract get(key: string): Promise<ScaleType>;

	public abstract uniqueNotesPerOctave(): Promise<number[]>;

}

@Singleton
export class DexieScaleDao extends ScaleDao {

	public constructor(@Inject private _db: SMTDB) {
		super();
	}

	public get(key: string): Promise<ScaleType> {
		return {} as Promise<ScaleType>;
	}

	public async uniqueNotesPerOctave(): Promise<number[]> {
		const array = await this._db.scaleTypes.orderBy('notesPerOctave').uniqueKeys();
		return array.map(part => Number(part));
	}

	// public nonChromaticNames(): Promise<ScaleName[]> {
	// 	let names = new Array<ScaleName>();
	// 	return this._db.scaleTypes
	// 					.where('notesPerOctave').below(12)
	// 					.each(scale => names.push({
	// 						key: scale.key,
	// 						display: scale.display,
	// 						aliases: scale.aliases 
	// 					}))
	// 					.then(() => names);
	// }

}