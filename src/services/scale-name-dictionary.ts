import { ScaleName } from '@/models/scale-name';

export class ScaleNameDictionary {

	public readonly map = new Map<string, ScaleName>();

	public add(scaleName: ScaleName): this {
		this.map.set(scaleName.key, scaleName);
		return this;
	}

	public get(key: string, defaultKey?: string): ScaleName | undefined {
		let scaleName = this.map.get(key);
		if (scaleName === undefined && defaultKey != undefined) {
			scaleName = this.map.get(defaultKey);
		}
		return scaleName;
	}

	public aliasesOf(arg: ScaleName | string): ScaleName[] {
		return this.aliasKeysOf(arg)
					.map(key => this.map.get(key))
					.filter(scaleName => scaleName !== undefined) as ScaleName[];
	}

	public aliasKeysOf(arg: ScaleName | string): string[] {
		let scaleName = this.map.get((arg instanceof ScaleName) ? arg.key : arg);
		return scaleName ? scaleName.aliasKeys : [];
	}

}