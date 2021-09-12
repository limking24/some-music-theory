import { ScaleTonicRangeFactory } from '@/factories/scale-tonic-range-factory';
import { toTitleCase } from '@/functional/string';
import { ScaleTonicRange } from '@/models/scale-tonic-range';
import { ScaleType } from '@tonaljs/tonal';
import { ScaleMapRecord, ScaleRecord, TonalJsScaleRecord } from './record-types';

export interface Records {
	scales: ScaleRecord[];
	tonalJsScales: TonalJsScaleRecord[];
	scaleMap: ScaleMapRecord[];
}

export function create(): Records {
	let scales = new Array<ScaleRecord>();
	let scaleMap = new Array<ScaleMapRecord>();
	let tonalJsScales = new Array<TonalJsScaleRecord>();
	let dataByName = createDataByName();
	let replacement = {
		' ': '-',
		'\'': '',
		'#': ''
	} as { [key: string]: string };
	ScaleType
		.all()
		.forEach(scale => {
			let names = [ scale.name, ...scale.aliases];										// names: ['half-whole diminished', 'dominant diminished', 'messiaen's mode #2']
			let keys = names.map(name => name.replace(/['# ]/g, char => replacement[char]));	// keys:  ['half-whole-diminished', 'dominant-diminished', 'messiaens-mode-2']
			keys.forEach((key, i) => {
				// ScaleRecord
				scales.push({ 
					key, 
					display: toTitleCase(names[i]), 
					aliasKeys: keys.filter(k => k !== key)
				});
				// ScaleMapRecord
				scaleMap.push({ 
					scaleKey: key, 
					tonalJsScaleName: names[i]
				});
			});
			// TonalJsScaleRecord
			tonalJsScales.push({
				name: scale.name,
				notesPerOctave: scale.intervals.length,
				tonicRange: dataByName.get(scale.name)!
			});
		});
	return { scales, scaleMap, tonalJsScales };
}

function createDataByName(): Map<string, ScaleTonicRange> {
	let factory = new ScaleTonicRangeFactory();
	let map = new Map<string, ScaleTonicRange>();
	map.set('aeolian',							factory.create(5, 17));
	map.set('altered',							factory.create(3, 15));
	map.set('augmented heptatonic',				factory.create(1, 12));
	map.set('augmented',						factory.create(0, 11));
	map.set('balinese',							factory.create(5, 16));
	map.set('bebop locrian',					factory.create(7, 18));
	map.set('bebop major',						factory.create(1, 12));
	map.set('bebop minor',						factory.create(4, 15));
	map.set('bebop',							factory.create(3, 14));
	map.set('composite blues',					factory.create(5, 16));
	map.set('diminished',						factory.create(5, 16));
	map.set('dorian #4',						factory.create(3, 14));
	map.set('dorian b2',						factory.create(5, 17));
	map.set('dorian',							factory.create(4, 16));
	map.set('double harmonic lydian',			factory.create(4, 15));
	map.set('double harmonic major',			factory.create(4, 16));
	map.set('egyptian',							factory.create(4, 16));
	map.set('enigmatic',						factory.create(5, 16));
	map.set('flamenco',							factory.create(4, 16));
	map.set('flat six pentatonic',				factory.create(4, 16));
	map.set('flat three pentatonic',			factory.create(4, 16));
	map.set('half-whole diminished',			factory.create(4, 15));
	map.set('harmonic major',					factory.create(4, 15));
	map.set('harmonic minor',					factory.create(4, 15));
	map.set('hirajoshi',						factory.create(5, 17));
	map.set('hungarian major',					factory.create(1, 13));
	map.set('hungarian minor',					factory.create(3, 15));
	map.set('ichikosucho',						factory.create(4, 15));
	map.set('in-sen',							factory.create(6, 18));
	map.set('ionian pentatonic',				factory.create(2, 14));
	map.set('iwato',							factory.create(7, 19));
	map.set('kafi raga',						factory.create(3, 15));
	map.set('kumoijoshi',						factory.create(6, 18));
	map.set('leading whole tone',				factory.create(1, 13));
	map.set('locrian #2',						factory.create(6, 18));
	map.set('locrian 6',						factory.create(6, 17));
	map.set('locrian major',					factory.create(5, 17));
	map.set('locrian pentatonic',				factory.create(7, 19));
	map.set('locrian',							factory.create(7, 19));
	map.set('lydian #5P pentatonic',			factory.create(0, 12));
	map.set('lydian #9',						factory.create(0, 11));
	map.set('lydian augmented',					factory.create(0, 12));
	map.set('lydian diminished',				factory.create(3, 14));
	map.set('lydian dominant pentatonic',		factory.create(2, 14));
	map.set('lydian dominant',					factory.create(2, 14));
	map.set('lydian minor',						factory.create(3, 15));
	map.set('lydian pentatonic',				factory.create(1, 13));
	map.set('lydian',							factory.create(1, 13));
	map.set('major augmented',					factory.create(1, 12));
	map.set('major blues',						factory.create(3, 15));
	map.set('major pentatonic',					factory.create(2, 14));
	map.set('major',							factory.create(2, 14));
	map.set('malkos raga',						factory.create(6, 18));
	map.set('melodic minor',					factory.create(3, 15));
	map.set('messiaen\'s mode #3',				factory.create(3, 15));
	map.set('messiaen\'s mode #4',				factory.create(4, 15));
	map.set('messiaen\'s mode #5',				factory.create(3, 14));
	map.set('messiaen\'s mode #6',				factory.create(0, 12));
	map.set('messiaen\'s mode #7',				factory.create(4, 15));
	map.set('minor #7M pentatonic',				factory.create(3, 15));
	map.set('minor bebop',						factory.create(4, 15));
	map.set('minor blues',						factory.create(6, 18));
	map.set('minor hexatonic',					factory.create(3, 15));
	map.set('minor pentatonic',					factory.create(5, 17));
	map.set('minor six diminished',				factory.create(4, 15));
	map.set('minor six pentatonic',				factory.create(4, 16));
	map.set('mixolydian b6',					factory.create(4, 16));
	map.set('mixolydian pentatonic',			factory.create(3, 15));
	map.set('mixolydian',						factory.create(3, 15));
	map.set('mystery #1',						factory.create(6, 17));
	map.set('neopolitan major pentatonic',		factory.create(5, 17));
	map.set('neopolitan major',					factory.create(4, 16));
	map.set('oriental',							factory.create(5, 17));
	map.set('pelog',							factory.create(6, 18));
	map.set('persian',							factory.create(5, 16));
	map.set('phrygian dominant',				factory.create(5, 16));
	map.set('phrygian',							factory.create(6, 18));
	map.set('piongio',							factory.create(4, 15));
	map.set('prometheus neopolitan',			factory.create(3, 15));
	map.set('prometheus',						factory.create(2, 14));
	map.set('purvi raga',						factory.create(4, 15));
	map.set('ritusen',							factory.create(3, 15));
	map.set('romanian minor',					factory.create(6, 17));
	map.set('scriabin',							factory.create(5, 16));
	map.set('six tone symmetric',				factory.create(3, 14));
	map.set('spanish heptatonic',				factory.create(5, 16));
	map.set('super locrian pentatonic',			factory.create(8, 20));
	map.set('todi raga',						factory.create(4, 15));
	map.set('ultralocrian',						factory.create(9, 20));
	map.set('vietnamese 1',						factory.create(6, 17));
	map.set('whole tone pentatonic',			factory.create(6, 17));
	map.set('whole tone',						factory.create(1, 13));
	return map;
}