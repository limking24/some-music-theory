import { Inject, Singleton } from 'typescript-ioc';

export class ScaleName {

	public constructor(public readonly key: string,
						public readonly ref: string,
						public readonly display: string,
						public readonly aliasKeys: string[]) {}

}

export abstract class ScaleNames implements Array<ScaleName> {}
export interface ScaleNames extends Array<ScaleName> {}

export interface ScaleNameOptionByKey {
	[key: string]: ScaleNameOption;
}

export class ScaleNameOption {

	public constructor(public readonly value: ScaleName,
						public selected = false,
						public aliasOfSelected = false) {}

	public static create(scaleNames: ScaleNames): ScaleNameOptionByKey {
		return scaleNames
				.reduce((options, scaleName) => {
					options[scaleName.key] = new ScaleNameOption(scaleName);
					return options;
				}, {} as ScaleNameOptionByKey);
	}

}

@Singleton
export class ScaleNameDictionary {

	public readonly map = new Map<string, ScaleName>();

	public constructor(@Inject scaleNames: ScaleNames) {
		scaleNames.forEach(scaleName => {
			this.map.set(scaleName.key, scaleName);
		});
	}

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