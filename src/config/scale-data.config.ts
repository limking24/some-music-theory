import { toTitleCase } from '@/functional/string';
import { ScaleName, ScaleNames } from '@/models/scale-name';
import { ScaleTonicRangeDictionary, ScaleTonicRangeFactory } from '@/models/scale-tonic-range';
import { ScaleType } from '@tonaljs/tonal';
import { Container, ObjectFactory } from 'typescript-ioc';

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
const scaleNameProvider: ObjectFactory = () => {
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

let scaleTonicRangeDictionary: ScaleTonicRangeDictionary | undefined;
const scaleTonicRangeDictionaryProvider: ObjectFactory = () => {
	if (scaleTonicRangeDictionary === undefined) {
		let factory = Container.get(ScaleTonicRangeFactory);
		scaleTonicRangeDictionary = new ScaleTonicRangeDictionary();
		scaleTonicRangeDictionary
			.add('aeolian',							factory.create(5, 17))
			.add('altered',							factory.create(3, 15))
			.add('augmented heptatonic',			factory.create(1, 12))
			.add('augmented',						factory.create(0, 11))
			.add('balinese',						factory.create(5, 16))
			.add('bebop locrian',					factory.create(7, 18))
			.add('bebop major',						factory.create(1, 12))
			.add('bebop minor',						factory.create(4, 15))
			.add('bebop',							factory.create(3, 14))
			.add('composite blues',					factory.create(5, 16))
			.add('diminished',						factory.create(5, 16))
			.add('dorian #4',						factory.create(3, 14))
			.add('dorian b2',						factory.create(5, 17))
			.add('dorian',							factory.create(4, 16))
			.add('double harmonic lydian',			factory.create(4, 15))
			.add('double harmonic major',			factory.create(4, 16))
			.add('egyptian',						factory.create(4, 16))
			.add('enigmatic',						factory.create(5, 16))
			.add('flamenco',						factory.create(4, 16))
			.add('flat six pentatonic',				factory.create(4, 16))
			.add('flat three pentatonic',			factory.create(4, 16))
			.add('half-whole diminished',			factory.create(4, 15))
			.add('harmonic major',					factory.create(4, 15))
			.add('harmonic minor',					factory.create(4, 15))
			.add('hirajoshi',						factory.create(5, 17))
			.add('hungarian major',					factory.create(1, 13))
			.add('hungarian minor',					factory.create(3, 15))
			.add('ichikosucho',						factory.create(4, 15))
			.add('in-sen',							factory.create(6, 18))
			.add('ionian pentatonic',				factory.create(2, 14))
			.add('iwato',							factory.create(7, 19))
			.add('kafi raga',						factory.create(3, 15))
			.add('kumoijoshi',						factory.create(6, 18))
			.add('leading whole tone',				factory.create(1, 13))
			.add('locrian #2',						factory.create(6, 18))
			.add('locrian 6',						factory.create(6, 17))
			.add('locrian major',					factory.create(5, 17))
			.add('locrian pentatonic',				factory.create(7, 19))
			.add('locrian',							factory.create(7, 19))
			.add('lydian #5P pentatonic',			factory.create(0, 12))
			.add('lydian #9',						factory.create(0, 11))
			.add('lydian augmented',				factory.create(0, 12))
			.add('lydian diminished',				factory.create(3, 14))
			.add('lydian dominant pentatonic',		factory.create(2, 14))
			.add('lydian dominant',					factory.create(2, 14))
			.add('lydian minor',					factory.create(3, 15))
			.add('lydian pentatonic',				factory.create(1, 13))
			.add('lydian',							factory.create(1, 13))
			.add('major augmented',					factory.create(1, 12))
			.add('major blues',						factory.create(3, 15))
			.add('major pentatonic',				factory.create(2, 14))
			.add('major',							factory.create(2, 14))
			.add('malkos raga',						factory.create(6, 18))
			.add('melodic minor',					factory.create(3, 15))
			.add('messiaen\'s mode #3',				factory.create(3, 15))
			.add('messiaen\'s mode #4',				factory.create(4, 15))
			.add('messiaen\'s mode #5',				factory.create(3, 14))
			.add('messiaen\'s mode #6',				factory.create(0, 12))
			.add('messiaen\'s mode #7',				factory.create(4, 15))
			.add('minor #7M pentatonic',			factory.create(3, 15))
			.add('minor bebop',						factory.create(4, 15))
			.add('minor blues',						factory.create(6, 18))
			.add('minor hexatonic',					factory.create(3, 15))
			.add('minor pentatonic',				factory.create(5, 17))
			.add('minor six diminished',			factory.create(4, 15))
			.add('minor six pentatonic',			factory.create(4, 16))
			.add('mixolydian b6',					factory.create(4, 16))
			.add('mixolydian pentatonic',			factory.create(3, 15))
			.add('mixolydian',						factory.create(3, 15))
			.add('mystery #1',						factory.create(6, 17))
			.add('neopolitan major pentatonic',		factory.create(5, 17))
			.add('neopolitan major',				factory.create(4, 16))
			.add('oriental',						factory.create(5, 17))
			.add('pelog',							factory.create(6, 18))
			.add('persian',							factory.create(5, 16))
			.add('phrygian dominant',				factory.create(5, 16))
			.add('phrygian',						factory.create(6, 18))
			.add('piongio',							factory.create(4, 15))
			.add('prometheus neopolitan',			factory.create(3, 15))
			.add('prometheus',						factory.create(2, 14))
			.add('purvi raga',						factory.create(4, 15))
			.add('ritusen',							factory.create(3, 15))
			.add('romanian minor',					factory.create(6, 17))
			.add('scriabin',						factory.create(5, 16))
			.add('six tone symmetric',				factory.create(3, 14))
			.add('spanish heptatonic',				factory.create(5, 16))
			.add('super locrian pentatonic',		factory.create(8, 20))
			.add('todi raga',						factory.create(4, 15))
			.add('ultralocrian',					factory.create(9, 20))
			.add('vietnamese 1',					factory.create(6, 17))
			.add('whole tone pentatonic',			factory.create(6, 17))
			.add('whole tone',						factory.create(1, 13))
	}
	return scaleTonicRangeDictionary;
};

export default [
	{ bind: ScaleNames, factory: scaleNameProvider },
	{ bind: ScaleTonicRangeDictionary, factory: scaleTonicRangeDictionaryProvider }
];