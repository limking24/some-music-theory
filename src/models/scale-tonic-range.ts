import { Singleton } from 'typescript-ioc';

export class ScaleTonicRange {

	public constructor(public readonly upper: number,
						public readonly lower: number) {}

	public outOfRange(index: number): boolean {
		return index < this.upper || index > this.lower;
	}

}

export const NoRange = new ScaleTonicRange(0, 20);

@Singleton
export class ScaleTonicRangeFactory {

	private _cache = new Map<string, ScaleTonicRange>();

	/**
	 * Returns a scale tonic range if it has been created before.
	 * Otherwise, it will be created and cached first.
	 * 
	 * @param upper upper bound
	 * @param lower lower bound
	 * @returns an instance of ScaleTonicRange
	 */
	public create(upper: number, lower: number): ScaleTonicRange {
		let key = `${upper},${lower}`;
		let range = this._cache.get(key);
		if (range === undefined) {
			range = new ScaleTonicRange(upper, lower);
			this._cache.set(key, range);
		}
		return range;
	}

}