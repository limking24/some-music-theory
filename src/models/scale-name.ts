import { toTitleCase } from '@/functional/string';
import { ScaleType } from '@tonaljs/scale-type';

export class ScaleName {

	public constructor(public readonly key: string,
						public readonly display: string,
						public readonly aliasKeys: string[]) {}

}

const replacement = {
	' ': '-',
	'\'': '',
	'#': ''
} as {
	[key: string]: string
};

export class TonalScaleName extends ScaleName {

	public constructor(key: string,
						display: string,
						aliasKeys: string[],
						public readonly ref: string) {
		super(key, display, aliasKeys);
	}

	/**
	 * Convert a ScaleType instance into a TonalScaleName array like
	 * the following.
	 * 
	 * ```
	 * // From
	 * {
	 *   name: 'half-whole diminished',
	 *   aliases: ['dominant diminished', 'messiaen\'s mode #2']
	 * }
	 * 
	 * // To
	 * [
	 *   {
	 *     key: 'dominant-diminished',
	 *     display: 'Dominant Diminished',
	 *     aliasKeys: ['half-whole-diminished', 'messiaens-mode-2'],
	 *     ref: 'half-whole diminished'
	 *   },
	 *   {
	 *     key: 'half-whole-diminished',
	 *     display: 'Half-whole Diminished',
	 *     aliasKeys: ['dominant-diminished', 'messiaens-mode-2'],
	 *     ref: 'half-whole diminished'
	 *   },
	 *   {
	 *     key: 'messiaens-mode-2',
	 *     display: 'Messiaen\'s Mode #2',
	 *     aliasKeys: ['dominant-diminished', 'half-whole-diminished'],
	 *     ref: 'half-whole diminished'
	 *   }
	 * ]
	 * ```
	 * 
	 * @returns a TonalScaleName array
	 */
	public static from(scale: ScaleType): TonalScaleName[] {
		let array = new Array<TonalScaleName>();
		let names = [ scale.name, ...scale.aliases];										// names: ['half-whole diminished', 'dominant diminished', 'messiaen's mode #2']
		let keys = names.map(name => name.replace(/['# ]/g, char => replacement[char]));	// keys:  ['half-whole-diminished', 'dominant-diminished', 'messiaens-mode-2']
		keys.forEach((key, index) => {
			array.push(new TonalScaleName(
				key, 
				toTitleCase(names[index]), 
				keys.filter(k => k !== key), 
				scale.name
			));
		});
		return array;
	}

}

export interface ScaleNameOptionMap {
	[key: string]: ScaleNameOption;
}

export class ScaleNameOption {

	public constructor(public readonly value: ScaleName,
						public selected = false,
						public aliasOfSelected = false) {}
	
	public static create(scaleNames: ScaleName[]): ScaleNameOptionMap {
		return scaleNames
				.reduce((options, scaleName) => {
					options[scaleName.key] = new ScaleNameOption(scaleName);
					return options;
				}, {} as ScaleNameOptionMap);
	}

	public toggleSelected(): void {
		this.selected = !this.selected;
	}

	public toggleAliasOfSelected(): void {
		this.aliasOfSelected = !this.aliasOfSelected;
	}

}