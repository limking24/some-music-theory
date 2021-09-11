import { ScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleName } from '@/models/scale-name';
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
export class ScaleNameProvider {

	private _nonChromatic: ScaleName[] | undefined;

	public constructor(@Inject private readonly _dao: ScaleNameDao) {}

	/**
	 * Get all names of scale which has fewer than 12 notes per octave.
	 */
	public nonChromatic(): ScaleName[] {
		if (this._nonChromatic === undefined) {
			this._nonChromatic = this._dao
										.all()
										.filter(name => name.key !== 'chromatic');
		}
		return this._nonChromatic;
	}

	/**
	 * Find a ScaleName instance by key. If not found, a default
	 * instance will be returned.
	 */
	public findNonChromatic(key: string): ScaleName {
		let names = this.nonChromatic();
		let name = names.find(n => n.key === key);
		return name ? name : names[0];
	}
	
}