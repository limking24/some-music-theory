import { TonalJsScaleRefDao } from '@/data-access/tonaljs-scale-ref-dao';
import { Scale } from '@tonaljs/tonal';
import { Inject, Singleton } from 'typescript-ioc';
import { Optional } from 'typescript-optional';

export abstract class ScaleService {

	public abstract getNotes(key: string, tonic: string): Promise<Optional<string[]>>;

}

@Singleton
export class TonalJsScaleService extends ScaleService {

	public constructor(@Inject private _refDao: TonalJsScaleRefDao) {
		super();
	}

	public async getNotes(key: string, tonic: string): Promise<Optional<string[]>> {
		let ref = await this._refDao.getRef(key);
		if (ref.isPresent()) {
			let scale = Scale.get(`${tonic} ${ref.get()}`);
			if (scale.notes.length > 1) {
				return Optional.of(scale.notes);
			}
		}
		return Optional.empty();
	}

}