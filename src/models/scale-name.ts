import { toTitleCase } from '@/functional/string';
import { ScaleType } from '@tonaljs/tonal';

const replacement = {
	' ': '-',
	'\'': '',
	'#': ''
} as {
	[key: string]: string
};

export class ScaleName {

	private static MAP = ScaleType
							.all()
							.filter(scale => scale.name !== 'chromatic')
							.reduce((map, scale) => {
								/* e.g.
								   names: ['half-whole diminished', 'dominant diminished', 'messiaen's mode #2']
								   keys:  ['half-whole-diminished', 'dominant-diminished', 'messiaens-mode-2'] */
								let names = [ scale.name, ...scale.aliases.map(alias => alias.startsWith('·') ? alias.slice(1) : alias)];
								let keys = names.map(name => name.replace(/['# ]/g, char => replacement[char]));
								keys.forEach((key, index) => {
									map[key] = new ScaleName(
										key, 
										scale.name, 
										toTitleCase(names[index]), 
										keys.filter(k => k !== key)
									);
								});
								return map;
							}, {} as {
								[key: string]: ScaleName;
							});

	public static KEYS = Object
							.keys(ScaleName.MAP)
							.sort((a, b) => ScaleName.MAP[a].display.localeCompare(ScaleName.MAP[b].display));

	public constructor(public readonly key: string,
						public readonly ref: string,
						public readonly display: string,
						public readonly aliasKeys: string[]) {}

	public static get(key: string, defaultKey = 'major'): ScaleName {
		let scaleName = ScaleName.MAP[key];
		if (scaleName === undefined) {
			scaleName = ScaleName.MAP[defaultKey];
		}
		return scaleName!;
	}

	public static aliasKeysOf(key: string): string[] {
		let scaleName = ScaleName.MAP[key];
		return scaleName ? scaleName.aliasKeys : [];
	}

	public get aliases(): ScaleName[] {
		return this.aliasKeys.map(key => ScaleName.MAP[key]);
	}

}