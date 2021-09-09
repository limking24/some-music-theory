import { TonalScaleNameFactory } from '@/middleware/tonal-scale-name-factory';
import { ScaleName, TonalScaleName } from '@/models/scale-name';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleNameProvider {

	public abstract get(): ScaleName[];

}

@Singleton
export class TonalScaleNameProvider extends ScaleNameProvider {

	private _options: TonalScaleName[] | undefined;

	public constructor(@Inject public readonly factory: TonalScaleNameFactory) {
		super();
	}

	public get(): ScaleName[] {
		if (this._options === undefined) {
			this._options = this.factory.exclude('chromatic');
		}
		return this._options;
	}
	
}