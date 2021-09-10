import { TonalScaleName, TonalScaleNameFactory } from '@/middleware/tonal-scale-name';
import { ScaleName } from '@/models/scale-name';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleNameProvider {

	public abstract nonChromatic(): ScaleName[];

}

@Singleton
export class TonalScaleNameProvider extends ScaleNameProvider {

	private _nonChromatic: TonalScaleName[] | undefined;

	public constructor(@Inject public readonly factory: TonalScaleNameFactory) {
		super();
	}

	public nonChromatic(): TonalScaleName[] {
		if (this._nonChromatic === undefined) {
			this._nonChromatic = this.factory
										.all()
										.filter(name => name.key !== 'chromatic');
		}
		return this._nonChromatic;
	}
	
}