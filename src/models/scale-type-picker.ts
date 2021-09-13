import { Displayable, Options } from './options';
import { ScaleType as ScaleTypeDto } from '@/data/scale-type';

export enum ScaleSupertype {
	Monotonic = 1,
	Ditonic = 2,
	Tritonic = 3,
	Tetratonic = 4,
	Pentatonic = 5,
	Hexatonic = 6,
	Heptatonic = 7,
	Octatonic = 8,
	Nonatonic = 9,
	Decatonic = 10,
	Chromatic = 12
}

export class ScaleType implements Displayable {

	public constructor(public readonly display: string,
						public readonly aliasKeys: string[],
						public aliasOfSelected = false) {}

	public toggleAliasOfSelected(): void {
		this.aliasOfSelected = !this.aliasOfSelected;
	}

}

export function createSupertypeOptions(supertypes: number[]): Options {
	return supertypes
			.reduce((options, supertype) => {
				let display = ScaleSupertype[supertype];
				if (display) {
					options[supertype] = { display };
				}
				return options;
			}, {} as Options);
}

export function createTypeOptions(dtos: ScaleTypeDto[]): Options<ScaleType> {
	return dtos
			.reduce((options, dto) => {
				options[dto.key] = new ScaleType(dto.display, dto.aliasKeys);
				return options;
			}, {} as Options<ScaleType>);
}