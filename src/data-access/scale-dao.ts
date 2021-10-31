import { ScaleType } from '@/data/scale-type';
import { Inject, Singleton } from 'typescript-ioc';
import { Optional } from 'typescript-optional';
import { SMTDB } from './database';

export abstract class ScaleDao {

	public abstract get(key: string): Promise<Optional<ScaleType>>;

	public abstract getBySupertype(supertype: number): Promise<ScaleType[]>;

	public abstract supertypes(): Promise<number[]>;

	public abstract displayOf(keys: string[]): Promise<string[]>;

}

@Singleton
export class DexieScaleDao extends ScaleDao {

	public constructor(@Inject private _db: SMTDB) {
		super();
	}

	public async get(key: string): Promise<Optional<ScaleType>> {
		let type = await this._db.scaleTypes.where('key').equalsIgnoreCase(key).first();
		return Optional.ofNullable(type);
	}

	public async getBySupertype(supertype: number): Promise<ScaleType[]> {
		return await this._db.scaleTypes.where('supertype').equals(supertype).toArray();
	}

	public async supertypes(): Promise<number[]> {
		const array = await this._db.scaleTypes.orderBy('supertype').uniqueKeys();
		return array.map(part => Number(part));
	}

	public async displayOf(keys: string[]): Promise<string[]> {
		let scales = await Promise.all(keys.map(key => this.get(key)));
		return scales
				.filter(scale => scale.isPresent())
				.map(scale => scale.get().display);
	}

}