import { ScaleTonicRange } from '@/data/scale-tonic-range';
import { ScaleType } from '@/data/scale-type';
import { TonalJsScaleRef } from '@/data/tonaljs-scale-ref';
import { toTitleCase } from '@/functional/string';
import { ScaleType as ScaleTypeUtil } from '@tonaljs/tonal';

export interface Data {
	scaleTypes: ScaleType[];
	tonalJsScaleRefs: TonalJsScaleRef[];
}

interface TonalJsScaleRefToDataMap {
	[key: string]: {
		tonicRange: ScaleTonicRange;
	};
}

export function create(): Data {
	const replacement = { ' ': '-', '\'': '', '#': '' } as { [key: string]: string };
	let scaleTypes = new Array<ScaleType>();
	let tonalJsScaleRefs = new Array<TonalJsScaleRef>();
	let refToDataMap = createRefToDatMap();
	ScaleTypeUtil
		.all()
		.forEach(scale => {
			let ref = scale.name;
			let names = [ scale.name, ...scale.aliases];									// names: ['dominant diminished', 'half-whole diminished', 'messiaen's mode #2']
			let keys = names.map(ref => ref.replace(/['# ]/g, char => replacement[char]));	// keys:  ['dominant-diminished', 'half-whole-diminished', 'messiaens-mode-2']
			keys.forEach((key, i) => {
				let display = toTitleCase(names[i]);
				let aliasKeys = keys.filter(k => k !== key);
				let supertype = scale.intervals.length;
				let tonicRange = refToDataMap[ref].tonicRange;
				scaleTypes.push({ key, display, aliasKeys, supertype, tonicRange });
				tonalJsScaleRefs.push({ key, ref });
			});
		});
	return { scaleTypes: scaleTypes, tonalJsScaleRefs };
}

function createRefToDatMap(): TonalJsScaleRefToDataMap {
	return {
		'aeolian':						{ tonicRange: { upper: 5, lower: 17} },
		'altered':						{ tonicRange: { upper: 3, lower: 15} },
		'augmented heptatonic':			{ tonicRange: { upper: 1, lower: 12} },
		'augmented':					{ tonicRange: { upper: 0, lower: 11} },
		'balinese':						{ tonicRange: { upper: 5, lower: 16} },
		'bebop locrian':				{ tonicRange: { upper: 7, lower: 18} },
		'bebop major':					{ tonicRange: { upper: 1, lower: 12} },
		'bebop minor':					{ tonicRange: { upper: 4, lower: 15} },
		'bebop':						{ tonicRange: { upper: 3, lower: 14} },
		'chromatic':					{ tonicRange: { upper: 5, lower: 16} },
		'composite blues':				{ tonicRange: { upper: 5, lower: 16} },
		'diminished':					{ tonicRange: { upper: 5, lower: 16} },
		'dorian #4':					{ tonicRange: { upper: 3, lower: 14} },
		'dorian b2':					{ tonicRange: { upper: 5, lower: 17} },
		'dorian':						{ tonicRange: { upper: 4, lower: 16} },
		'double harmonic lydian':		{ tonicRange: { upper: 4, lower: 15} },
		'double harmonic major':		{ tonicRange: { upper: 4, lower: 16} },
		'egyptian':						{ tonicRange: { upper: 4, lower: 16} },
		'enigmatic':					{ tonicRange: { upper: 5, lower: 16} },
		'flamenco':						{ tonicRange: { upper: 4, lower: 16} },
		'flat six pentatonic':			{ tonicRange: { upper: 4, lower: 16} },
		'flat three pentatonic':		{ tonicRange: { upper: 4, lower: 16} },
		'half-whole diminished':		{ tonicRange: { upper: 4, lower: 15} },
		'harmonic major':				{ tonicRange: { upper: 4, lower: 15} },
		'harmonic minor':				{ tonicRange: { upper: 4, lower: 15} },
		'hirajoshi':					{ tonicRange: { upper: 5, lower: 17} },
		'hungarian major':				{ tonicRange: { upper: 1, lower: 13} },
		'hungarian minor':				{ tonicRange: { upper: 3, lower: 15} },
		'ichikosucho':					{ tonicRange: { upper: 4, lower: 15} },
		'in-sen':						{ tonicRange: { upper: 6, lower: 18} },
		'ionian pentatonic':			{ tonicRange: { upper: 2, lower: 14} },
		'iwato':						{ tonicRange: { upper: 7, lower: 19} },
		'kafi raga':					{ tonicRange: { upper: 3, lower: 15} },
		'kumoijoshi':					{ tonicRange: { upper: 6, lower: 18} },
		'leading whole tone':			{ tonicRange: { upper: 1, lower: 13} },
		'locrian #2':					{ tonicRange: { upper: 6, lower: 18} },
		'locrian 6':					{ tonicRange: { upper: 6, lower: 17} },
		'locrian major':				{ tonicRange: { upper: 5, lower: 17} },
		'locrian pentatonic':			{ tonicRange: { upper: 7, lower: 19} },
		'locrian':						{ tonicRange: { upper: 7, lower: 19} },
		'lydian #5P pentatonic':		{ tonicRange: { upper: 0, lower: 12} },
		'lydian #9':					{ tonicRange: { upper: 0, lower: 11} },
		'lydian augmented':				{ tonicRange: { upper: 0, lower: 12} },
		'lydian diminished':			{ tonicRange: { upper: 3, lower: 14} },
		'lydian dominant pentatonic':	{ tonicRange: { upper: 2, lower: 14} },
		'lydian dominant':				{ tonicRange: { upper: 2, lower: 14} },
		'lydian minor':					{ tonicRange: { upper: 3, lower: 15} },
		'lydian pentatonic':			{ tonicRange: { upper: 1, lower: 13} },
		'lydian':						{ tonicRange: { upper: 1, lower: 13} },
		'major augmented':				{ tonicRange: { upper: 1, lower: 12} },
		'major blues':					{ tonicRange: { upper: 3, lower: 15} },
		'major pentatonic':				{ tonicRange: { upper: 2, lower: 14} },
		'major':						{ tonicRange: { upper: 2, lower: 14} },
		'malkos raga':					{ tonicRange: { upper: 6, lower: 18} },
		'melodic minor':				{ tonicRange: { upper: 3, lower: 15} },
		'messiaen\'s mode #3':			{ tonicRange: { upper: 3, lower: 15} },
		'messiaen\'s mode #4':			{ tonicRange: { upper: 4, lower: 15} },
		'messiaen\'s mode #5':			{ tonicRange: { upper: 3, lower: 14} },
		'messiaen\'s mode #6':			{ tonicRange: { upper: 0, lower: 12} },
		'messiaen\'s mode #7':			{ tonicRange: { upper: 4, lower: 15} },
		'minor #7M pentatonic':			{ tonicRange: { upper: 3, lower: 15} },
		'minor bebop':					{ tonicRange: { upper: 4, lower: 15} },
		'minor blues':					{ tonicRange: { upper: 6, lower: 18} },
		'minor hexatonic':				{ tonicRange: { upper: 3, lower: 15} },
		'minor pentatonic':				{ tonicRange: { upper: 5, lower: 17} },
		'minor six diminished':			{ tonicRange: { upper: 4, lower: 15} },
		'minor six pentatonic':			{ tonicRange: { upper: 4, lower: 16} },
		'mixolydian b6':				{ tonicRange: { upper: 4, lower: 16} },
		'mixolydian pentatonic':		{ tonicRange: { upper: 3, lower: 15} },
		'mixolydian':					{ tonicRange: { upper: 3, lower: 15} },
		'mystery #1':					{ tonicRange: { upper: 6, lower: 17} },
		'neopolitan major pentatonic':	{ tonicRange: { upper: 5, lower: 17} },
		'neopolitan major':				{ tonicRange: { upper: 4, lower: 16} },
		'oriental':						{ tonicRange: { upper: 5, lower: 17} },
		'pelog':						{ tonicRange: { upper: 6, lower: 18} },
		'persian':						{ tonicRange: { upper: 5, lower: 16} },
		'phrygian dominant':			{ tonicRange: { upper: 5, lower: 16} },
		'phrygian':						{ tonicRange: { upper: 6, lower: 18} },
		'piongio':						{ tonicRange: { upper: 4, lower: 15} },
		'prometheus neopolitan':		{ tonicRange: { upper: 3, lower: 15} },
		'prometheus':					{ tonicRange: { upper: 2, lower: 14} },
		'purvi raga':					{ tonicRange: { upper: 4, lower: 15} },
		'ritusen':						{ tonicRange: { upper: 3, lower: 15} },
		'romanian minor':				{ tonicRange: { upper: 6, lower: 17} },
		'scriabin':						{ tonicRange: { upper: 5, lower: 16} },
		'six tone symmetric':			{ tonicRange: { upper: 3, lower: 14} },
		'spanish heptatonic':			{ tonicRange: { upper: 5, lower: 16} },
		'super locrian pentatonic':		{ tonicRange: { upper: 8, lower: 20} },
		'todi raga':					{ tonicRange: { upper: 4, lower: 15} },
		'ultralocrian':					{ tonicRange: { upper: 9, lower: 20} },
		'vietnamese 1':					{ tonicRange: { upper: 6, lower: 17} },
		'whole tone pentatonic':		{ tonicRange: { upper: 6, lower: 17} },
		'whole tone':					{ tonicRange: { upper: 1, lower: 13} }
	};
}