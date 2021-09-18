import { Inject, Singleton } from 'typescript-ioc';
import { Optional } from 'typescript-optional';
import { SMTDB } from './database';

@Singleton
export class TonalJsScaleRefDao {

	public constructor(@Inject private _db: SMTDB) {}

	public async getRef(key: string): Promise<Optional<string>> {
		let data = await this._db.tonalJsScaleRefs.where('key').equalsIgnoreCase(key).first();
		return Optional.ofNullable(data?.ref);
	}

}