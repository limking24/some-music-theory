import { TonalJsScaleRefDao } from '@/data-access/tonaljs-scale-ref-dao';
import { Scale } from '@tonaljs/tonal';
import { Inject, Singleton } from 'typescript-ioc';
import { Optional } from 'typescript-optional';

export abstract class ScaleService {

	public abstract getNotesByTonics(key: string, tonics: string[]): Promise<Optional<string[][]>>;

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

}