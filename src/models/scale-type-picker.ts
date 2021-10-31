export class ScaleType {

	public constructor(public readonly display: string,
						public readonly aliasKeys: string[],
						public aliasOfSelected = false) {}

	public toggleAliasOfSelected(): void {
		this.aliasOfSelected = !this.aliasOfSelected;
	}

}