import { InMemoryTonalScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleName, TonalScaleName } from '@/models/scale-name';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleNameProvider {

	/**
	 * Get all names of scale which has fewer than 12 notes per octave.
	 */
	public abstract nonChromatic(): ScaleName[];

	/**
	 * Find a ScaleName instance by key. If not found, a default
	 * instance will be returned.
	 */
	public abstract findNonChromatic(key: string): ScaleName;

}

@Singleton
export class TonalScaleNameProvider extends ScaleNameProvider {

	private _nonChromatic: TonalScaleName[] | undefined;

	public constructor(@Inject private readonly _dao: InMemoryTonalScaleNameDao) {
		super();
	}

	public nonChromatic(): TonalScaleName[] {
		if (this._nonChromatic === undefined) {
			this._nonChromatic = this._dao
										.all()
										.filter(name => name.key !== 'chromatic');
		}
		return this._nonChromatic;
	}

	public findNonChromatic(key: string): TonalScaleName {
		let names = this.nonChromatic();
		for (let name of names) {
			if (key === name.key) {
				return name;
			}
		}
		return names[0];
	}
	
}