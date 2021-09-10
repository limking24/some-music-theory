import { ScaleName, TonalScaleName } from '@/models/scale-name';
import { ScaleType } from '@tonaljs/tonal';
import { Singleton } from 'typescript-ioc';

export abstract class ScaleNameDao {

	public abstract all(): ScaleName[];

	public abstract get(key: string): ScaleName | undefined;

	public abstract aliasKeysOf(key: string): string[];

	public abstract aliasesOf(key: string): ScaleName[];

}

@Singleton
export class InMemoryTonalScaleNameDao extends ScaleNameDao {

	private _names: TonalScaleName[] | undefined;

	public all(): TonalScaleName[] {
		if (this._names === undefined) {
			this._names = ScaleType
							.all()
							.reduce((array, scaleType) => {
								array.push(...TonalScaleName.from(scaleType));
								return array;
							}, [] as TonalScaleName[])
							.sort((a, b) => a.display.localeCompare(b.display));
			Object.freeze(this._names);
		}
		return this._names;
	}

	public get(key: string): ScaleName | undefined {
		for (let name of this.all()) {
			if (key === name.key) {
				return name;
			}
		}
		return undefined;
	}

	public aliasKeysOf(key: string): string[] {
		let name = this.get(key);
		return name ? name.aliasKeys : [];
	}

	public aliasesOf(key: string): ScaleName[] {
		return this.aliasKeysOf(key)
					.map(aliasKey => this.get(aliasKey))
					.filter(alias => alias !== undefined) as ScaleName[];
	}

}