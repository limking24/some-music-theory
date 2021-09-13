import { Displayable } from './options';

export class ScaleTypePickerItem implements Displayable {

	public constructor(public readonly display: string,
						public readonly aliasKeys: string[],
						public aliasOfSelected = false) {}

	public toggleAliasOfSelected(): void {
		this.aliasOfSelected = !this.aliasOfSelected;
	}

}