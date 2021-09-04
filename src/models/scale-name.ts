import { toTitleCase } from '@/functional/string';
import { ScaleType } from '@tonaljs/tonal';

export class ScaleName {

	public constructor(public key: string, public display: string, public aliases?: string[]) {}

}

export interface KeyedScaleName {
	[key: string]: ScaleName;
}

export const ScaleNameMap = ScaleType
							.all()
							.filter(scale => scale.name !== 'chromatic')
							.reduce((unsorted, scale) => {
								unsorted[scale.name] = new ScaleName(scale.name, toTitleCase(scale.name), scale.aliases);
								scale.aliases.forEach(alias => 
									unsorted[alias] = new ScaleName(scale.name, toTitleCase(alias[0] === '·' ? alias.slice(1) : alias), scale.aliases.map(a => (a == alias) ? scale.name : a))
								);
								return unsorted;
							}, {} as KeyedScaleName);

export const SortedScaleNameKey = Object
									.keys(ScaleNameMap)
									.sort((a, b) => ScaleNameMap[a].display.localeCompare(ScaleNameMap[b].display));