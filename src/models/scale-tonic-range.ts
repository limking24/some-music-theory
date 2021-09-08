import { Singleton } from 'typescript-ioc';

export class ScaleTonicRange {

	public constructor(public readonly upper: number,
						public readonly lower: number) {}

	public outOfRange(index: number): boolean {
		return index < this.upper || index > this.lower;
	}

}

@Singleton
export class ScaleTonicRangeFactory {

	private _cache = new Map<string, ScaleTonicRange>();

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

export class ScaleTonicRangeDictionary {

	public static NoRange = new ScaleTonicRange(0, 20);

	public readonly map = new Map<string, ScaleTonicRange>();

	public constructor() {}

	public add(ref: string, range: ScaleTonicRange): this {
		this.map.set(ref, range);
		return this;
	}

	public get(ref: string): ScaleTonicRange {
		let range = this.map.get(ref);
		return range ? range : ScaleTonicRangeDictionary.NoRange;
	}

}