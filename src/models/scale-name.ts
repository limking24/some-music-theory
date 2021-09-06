import { toTitleCase } from '@/functional/string';
import { ScaleType } from '@tonaljs/tonal';

const replacement = {
	' ': '-',
	'\'': '',
	'#': ''
} as {
	[key: string]: string
};

export interface ScaleNameMap {
	[key: string]: ScaleName;
}

export class ScaleName {

	private static _map: ScaleNameMap | undefined = undefined;

	private static _keys: string[] | undefined = undefined;

	public constructor(public readonly key: string,
						public readonly ref: string,
						public readonly display: string,
						public readonly aliasKeys: string[]) {}

	/**
	 * A mapping between scale name key and the instance itself.
	 * 
	 * ScaleType obtained from tonaljs will be transformed into
	 * ScaleName like the following:
	 * 
	 * ```
	 * // From
	 * {
	 *    name: 'half-whole diminished',
	 *    aliases: ['dominant diminished', 'messiaen\'s mode #2']
	 * }
	 * 
	 * // To
	 * MAP['half-whole-diminished'] = {
	 *    key: 'half-whole-diminished',
	 *    ref: 'half-whole diminished',
	 *    display: 'Half-whole Diminished',
	 *    aliasKeys: ['dominant-diminished', 'messiaens-mode-2']
	 * }
	 * 
	 * MAP['dominant-diminished'] = {
	 *    key: 'dominant-diminished',
	 *    ref: 'half-whole diminished',
	 *    display: 'Dominant Diminished',
	 *    aliasKeys: ['half-whole-diminished', 'messiaens-mode-2']
	 * }
	 * 
	 * MAP['messiaens-mode-2'] = {
	 *    key: 'messiaens-mode-2',
	 *    ref: 'half-whole diminished',
	 *    display: 'Messiaen\'s Mode #2',
	 *    aliasKeys: ['dominant-diminished', 'half-whole-diminished']
	 * }
	 * ```
	 */
	public static get Map(): ScaleNameMap {
		if (this._map === undefined) {
			this._map = ScaleType
							.all()
							.filter(scale => scale.name !== 'chromatic')
							.reduce((map, scale) => {
								let names = [ scale.name, ...scale.aliases];										// names: ['half-whole diminished', 'dominant diminished', 'messiaen's mode #2']
								let keys = names.map(name => name.replace(/['# ]/g, char => replacement[char]));	// keys:  ['half-whole-diminished', 'dominant-diminished', 'messiaens-mode-2']
								keys.forEach((key, index) => {
									map[key] = new ScaleName(
										key, 
										scale.name, 
										toTitleCase(names[index]), 
										keys.filter(k => k !== key)
									);
								});
								return map;
							}, {} as ScaleNameMap);
		}
		return this._map;
	}

	/**
	 * Sorted keys of all scale names.
	 */
	public static get Keys(): string[] {
		if (this._keys === undefined) {
			this._keys = Object
							.keys(ScaleName.Map)
							.sort((a, b) => ScaleName.Map[a].display.localeCompare(ScaleName.Map[b].display));
		}
		return this._keys;
	}

	public static get(key: string, defaultKey = 'major'): ScaleName {
		let scaleName = ScaleName.Map[key];
		if (scaleName === undefined) {
			scaleName = ScaleName.Map[defaultKey];
		}
		return scaleName!;
	}

	public static aliasKeysOf(key: string): string[] {
		let scaleName = ScaleName.Map[key];
		return scaleName ? scaleName.aliasKeys : [];
	}

	public get aliases(): ScaleName[] {
		return this.aliasKeys.map(key => ScaleName.Map[key]);
	}

}