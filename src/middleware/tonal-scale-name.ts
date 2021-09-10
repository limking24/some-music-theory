import { toTitleCase } from '@/functional/string';
import { ScaleName } from '@/models/scale-name';
import { ScaleType } from '@tonaljs/scale-type';
import { ScaleType as ScaleTypeUtil } from '@tonaljs/tonal';
import { Singleton } from 'typescript-ioc';

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

@Singleton
export class TonalScaleNameFactory {

	private _names: TonalScaleName[] | undefined;

	/**
	 * Create a single TonalScaleName array and cache it
	 * so it can be reused.
	 * 
	 * @returns a singleton TonalScaleName array
	 */
	public all(): TonalScaleName[] {
		if (this._names === undefined) {
			this._names = ScaleTypeUtil
							.all()
							.reduce((array, scaleType) => {
								array.push(...TonalScaleName.from(scaleType));
								return array;
							}, [] as TonalScaleName[])
							.sort((a, b) => a.display.localeCompare(b.display));
		}
		return this._names;
	}

}