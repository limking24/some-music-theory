import { toTitleCase } from '@/functional/string';
import { ScaleName, ScaleNames } from '@/models/scale-name';
import { ScaleType } from '@tonaljs/tonal';
import { ObjectFactory } from 'typescript-ioc';

const replacement = {
	' ': '-',
	'\'': '',
	'#': ''
} as {
	[key: string]: string
};

/**
 * Transform ScaleType array obtained from tonaljs into
 * ScaleName array like the following:
 * 
 * ```
 * // From
 * [
 *   //...
 *   {
 *     name: 'half-whole diminished',
 *     aliases: ['dominant diminished', 'messiaen\'s mode #2']
 *   }
 *   //...
 * ]
 * 
 * // To
 * [
 *   //...
 *   {
 *     key: 'half-whole-diminished',
 *     ref: 'half-whole diminished',
 *     display: 'Half-whole Diminished',
 *     aliasKeys: ['dominant-diminished', 'messiaens-mode-2']
 *   }, {
 *     key: 'dominant-diminished',
 *     ref: 'half-whole diminished',
 *     display: 'Dominant Diminished',
 *     aliasKeys: ['half-whole-diminished', 'messiaens-mode-2']
 *   }, {
 *     key: 'messiaens-mode-2',
 *     ref: 'half-whole diminished',
 *     display: 'Messiaen\'s Mode #2',
 *     aliasKeys: ['dominant-diminished', 'half-whole-diminished']
 *   }
 *   //...
 * ]
 * ```
 */
let scaleNames: ScaleNames | undefined;
const ScaleNameProvider: ObjectFactory = () => {
	 if (scaleNames === undefined) {
		 scaleNames = ScaleType
						.all()
						.filter(scale => scale.name !== 'chromatic')
						.reduce((array, scale) => {
							let names = [ scale.name, ...scale.aliases];										// names: ['half-whole diminished', 'dominant diminished', 'messiaen's mode #2']
							let keys = names.map(name => name.replace(/['# ]/g, char => replacement[char]));	// keys:  ['half-whole-diminished', 'dominant-diminished', 'messiaens-mode-2']
							keys.forEach((key, index) => {
								array.push(new ScaleName(
									key, 
									scale.name, 
									toTitleCase(names[index]), 
									keys.filter(k => k !== key)
								));
							});
							return array;
						}, [] as ScaleNames)
						.sort((a, b) => a.display.localeCompare(b.display));
	}
	return scaleNames;
};

export default [
	{ bind: ScaleNames, factory: ScaleNameProvider }
];