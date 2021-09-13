import { ScaleTonicRange } from '@/data/scale-tonic-range';
import { ScaleType } from '@/data/scale-type';
import { ScaleTypeRef } from '@/data/scale-type-ref';
import { toTitleCase } from '@/functional/string';
import { ScaleType as ScaleTypeUtil } from '@tonaljs/tonal';

export interface Data {
	scaleTypes: ScaleType[];
	scaleTypeRefs: ScaleTypeRef[];
}

interface DataByRef {
	[key: string]: {
		tonicRange: ScaleTonicRange;
	};
}

export function create(): Data {
	const replacement = { ' ': '-', '\'': '', '#': '' } as { [key: string]: string };
	let scaleTypes = new Array<ScaleType>();
	let scaleTypeRefs = new Array<ScaleTypeRef>();
	let dataByRef = createDataByRef();
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
				let tonicRange = dataByRef[ref].tonicRange;
				scaleTypes.push({ key, display, aliasKeys, supertype, tonicRange });
				scaleTypeRefs.push({ key, ref });
			});
		});
	return { scaleTypes: scaleTypes, scaleTypeRefs };
}

function createDataByRef(): DataByRef {
	return {
		'aeolian':						{ tonicRange: new ScaleTonicRange(5, 17) },
		'altered':						{ tonicRange: new ScaleTonicRange(3, 15) },
		'augmented heptatonic':			{ tonicRange: new ScaleTonicRange(1, 12) },
		'augmented':					{ tonicRange: new ScaleTonicRange(0, 11) },
		'balinese':						{ tonicRange: new ScaleTonicRange(5, 16) },
		'bebop locrian':				{ tonicRange: new ScaleTonicRange(7, 18) },
		'bebop major':					{ tonicRange: new ScaleTonicRange(1, 12) },
		'bebop minor':					{ tonicRange: new ScaleTonicRange(4, 15) },
		'bebop':						{ tonicRange: new ScaleTonicRange(3, 14) },
		'chromatic':					{ tonicRange: new ScaleTonicRange(5, 16) },
		'composite blues':				{ tonicRange: new ScaleTonicRange(5, 16) },
		'diminished':					{ tonicRange: new ScaleTonicRange(5, 16) },
		'dorian #4':					{ tonicRange: new ScaleTonicRange(3, 14) },
		'dorian b2':					{ tonicRange: new ScaleTonicRange(5, 17) },
		'dorian':						{ tonicRange: new ScaleTonicRange(4, 16) },
		'double harmonic lydian':		{ tonicRange: new ScaleTonicRange(4, 15) },
		'double harmonic major':		{ tonicRange: new ScaleTonicRange(4, 16) },
		'egyptian':						{ tonicRange: new ScaleTonicRange(4, 16) },
		'enigmatic':					{ tonicRange: new ScaleTonicRange(5, 16) },
		'flamenco':						{ tonicRange: new ScaleTonicRange(4, 16) },
		'flat six pentatonic':			{ tonicRange: new ScaleTonicRange(4, 16) },
		'flat three pentatonic':		{ tonicRange: new ScaleTonicRange(4, 16) },
		'half-whole diminished':		{ tonicRange: new ScaleTonicRange(4, 15) },
		'harmonic major':				{ tonicRange: new ScaleTonicRange(4, 15) },
		'harmonic minor':				{ tonicRange: new ScaleTonicRange(4, 15) },
		'hirajoshi':					{ tonicRange: new ScaleTonicRange(5, 17) },
		'hungarian major':				{ tonicRange: new ScaleTonicRange(1, 13) },
		'hungarian minor':				{ tonicRange: new ScaleTonicRange(3, 15) },
		'ichikosucho':					{ tonicRange: new ScaleTonicRange(4, 15) },
		'in-sen':						{ tonicRange: new ScaleTonicRange(6, 18) },
		'ionian pentatonic':			{ tonicRange: new ScaleTonicRange(2, 14) },
		'iwato':						{ tonicRange: new ScaleTonicRange(7, 19) },
		'kafi raga':					{ tonicRange: new ScaleTonicRange(3, 15) },
		'kumoijoshi':					{ tonicRange: new ScaleTonicRange(6, 18) },
		'leading whole tone':			{ tonicRange: new ScaleTonicRange(1, 13) },
		'locrian #2':					{ tonicRange: new ScaleTonicRange(6, 18) },
		'locrian 6':					{ tonicRange: new ScaleTonicRange(6, 17) },
		'locrian major':				{ tonicRange: new ScaleTonicRange(5, 17) },
		'locrian pentatonic':			{ tonicRange: new ScaleTonicRange(7, 19) },
		'locrian':						{ tonicRange: new ScaleTonicRange(7, 19) },
		'lydian #5P pentatonic':		{ tonicRange: new ScaleTonicRange(0, 12) },
		'lydian #9':					{ tonicRange: new ScaleTonicRange(0, 11) },
		'lydian augmented':				{ tonicRange: new ScaleTonicRange(0, 12) },
		'lydian diminished':			{ tonicRange: new ScaleTonicRange(3, 14) },
		'lydian dominant pentatonic':	{ tonicRange: new ScaleTonicRange(2, 14) },
		'lydian dominant':				{ tonicRange: new ScaleTonicRange(2, 14) },
		'lydian minor':					{ tonicRange: new ScaleTonicRange(3, 15) },
		'lydian pentatonic':			{ tonicRange: new ScaleTonicRange(1, 13) },
		'lydian':						{ tonicRange: new ScaleTonicRange(1, 13) },
		'major augmented':				{ tonicRange: new ScaleTonicRange(1, 12) },
		'major blues':					{ tonicRange: new ScaleTonicRange(3, 15) },
		'major pentatonic':				{ tonicRange: new ScaleTonicRange(2, 14) },
		'major':						{ tonicRange: new ScaleTonicRange(2, 14) },
		'malkos raga':					{ tonicRange: new ScaleTonicRange(6, 18) },
		'melodic minor':				{ tonicRange: new ScaleTonicRange(3, 15) },
		'messiaen\'s mode #3':			{ tonicRange: new ScaleTonicRange(3, 15) },
		'messiaen\'s mode #4':			{ tonicRange: new ScaleTonicRange(4, 15) },
		'messiaen\'s mode #5':			{ tonicRange: new ScaleTonicRange(3, 14) },
		'messiaen\'s mode #6':			{ tonicRange: new ScaleTonicRange(0, 12) },
		'messiaen\'s mode #7':			{ tonicRange: new ScaleTonicRange(4, 15) },
		'minor #7M pentatonic':			{ tonicRange: new ScaleTonicRange(3, 15) },
		'minor bebop':					{ tonicRange: new ScaleTonicRange(4, 15) },
		'minor blues':					{ tonicRange: new ScaleTonicRange(6, 18) },
		'minor hexatonic':				{ tonicRange: new ScaleTonicRange(3, 15) },
		'minor pentatonic':				{ tonicRange: new ScaleTonicRange(5, 17) },
		'minor six diminished':			{ tonicRange: new ScaleTonicRange(4, 15) },
		'minor six pentatonic':			{ tonicRange: new ScaleTonicRange(4, 16) },
		'mixolydian b6':				{ tonicRange: new ScaleTonicRange(4, 16) },
		'mixolydian pentatonic':		{ tonicRange: new ScaleTonicRange(3, 15) },
		'mixolydian':					{ tonicRange: new ScaleTonicRange(3, 15) },
		'mystery #1':					{ tonicRange: new ScaleTonicRange(6, 17) },
		'neopolitan major pentatonic':	{ tonicRange: new ScaleTonicRange(5, 17) },
		'neopolitan major':				{ tonicRange: new ScaleTonicRange(4, 16) },
		'oriental':						{ tonicRange: new ScaleTonicRange(5, 17) },
		'pelog':						{ tonicRange: new ScaleTonicRange(6, 18) },
		'persian':						{ tonicRange: new ScaleTonicRange(5, 16) },
		'phrygian dominant':			{ tonicRange: new ScaleTonicRange(5, 16) },
		'phrygian':						{ tonicRange: new ScaleTonicRange(6, 18) },
		'piongio':						{ tonicRange: new ScaleTonicRange(4, 15) },
		'prometheus neopolitan':		{ tonicRange: new ScaleTonicRange(3, 15) },
		'prometheus':					{ tonicRange: new ScaleTonicRange(2, 14) },
		'purvi raga':					{ tonicRange: new ScaleTonicRange(4, 15) },
		'ritusen':						{ tonicRange: new ScaleTonicRange(3, 15) },
		'romanian minor':				{ tonicRange: new ScaleTonicRange(6, 17) },
		'scriabin':						{ tonicRange: new ScaleTonicRange(5, 16) },
		'six tone symmetric':			{ tonicRange: new ScaleTonicRange(3, 14) },
		'spanish heptatonic':			{ tonicRange: new ScaleTonicRange(5, 16) },
		'super locrian pentatonic':		{ tonicRange: new ScaleTonicRange(8, 20) },
		'todi raga':					{ tonicRange: new ScaleTonicRange(4, 15) },
		'ultralocrian':					{ tonicRange: new ScaleTonicRange(9, 20) },
		'vietnamese 1':					{ tonicRange: new ScaleTonicRange(6, 17) },
		'whole tone pentatonic':		{ tonicRange: new ScaleTonicRange(6, 17) },
		'whole tone':					{ tonicRange: new ScaleTonicRange(1, 13) }
	};
}