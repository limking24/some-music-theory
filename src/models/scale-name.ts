export class ScaleName {

	public constructor(public readonly key: string,
						public readonly display: string,
						public readonly aliasKeys: string[]) {}

}

export interface ScaleNameOptionByKey {
	[key: string]: ScaleNameOption;
}

export class ScaleNameOption {

	public constructor(public readonly value: ScaleName,
						public selected = false,
						public aliasOfSelected = false) {}
	
	public create(scaleNames: ScaleName[]): ScaleNameOptionByKey {
		return scaleNames
				.reduce((options, scaleName) => {
					options[scaleName.key] = new ScaleNameOption(scaleName);
					return options;
				}, {} as ScaleNameOptionByKey);
	}

}