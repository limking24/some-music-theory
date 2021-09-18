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

export class ScaleType {

	public constructor(public readonly display: string,
						public readonly aliasKeys: string[],
						public aliasOfSelected = false) {}

	public toggleAliasOfSelected(): void {
		this.aliasOfSelected = !this.aliasOfSelected;
	}

}