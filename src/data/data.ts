import { ScaleTonicRange, ScaleType as ScaleTypeData } from '@/data/scale-type';
import { toTitleCase } from '@/functional/string';
import { ScaleType } from '@tonaljs/scale-type';
import { ScaleType as ScaleTypeUtil } from '@tonaljs/tonal';

// Object.assign(ScaleTypeUtil.get('whole tone').intervals, ['1P', '2M', '3M', '4A', '5A', '6A']);
Object.assign(ScaleTypeUtil.get('augmented').intervals, ['1P', '3m', '3M', '5P', '5A', '7M']);
Object.assign(ScaleTypeUtil.get('altered').intervals, ['1P', '2m', '3m', '4d', '5d', '6m', '7m']);
patch(ScaleTypeUtil.get('whole tone pentatonic'), ['1P', '2M', '3M', '4A', '5A'], '101010101000');

function patch(scale: ScaleType, intervals: string[], chroma: string): void {
	Object.assign(scale.intervals, intervals);
	Object.defineProperty(scale, 'chroma', { value: chroma, writable: false });
	Object.defineProperty(scale, 'normalized', { value: chroma, writable: false });
}

const Replacement = { ' ': '-', '\'': '', '#': '' } as { [key: string]: string };

export function toKey(ref: string): string {
	return ref.replace(/['# ]/g, char => Replacement[char]).toLowerCase();
}

export function create(): ScaleTypeData[] {
	let scaleTypes = new Array<ScaleTypeData>();
	let tonicRanges = createTonicRanges();
	ScaleTypeUtil
		.all()
		.forEach(scale => {
			let ref = scale.name;
			let names = [ scale.name, ...scale.aliases];	// names: ['dominant diminished', 'half-whole diminished', 'messiaen's mode #2']
			let keys = names.map(toKey);					// keys:  ['dominant-diminished', 'half-whole-diminished', 'messiaens-mode-2']
			keys.forEach((key, i) => {
				let display = toTitleCase(names[i]);
				let aliasKeys = keys.filter(k => k !== key);
				let supertype = scale.intervals.length;
				let tonicRange = tonicRanges[key];
				scaleTypes.push({ key, ref, display, aliasKeys, supertype, tonicRange });
			});
		});
	return scaleTypes;
}

function createTonicRanges(): Record<string, ScaleTonicRange> {
	return {
		'aeolian-b5':								{ upper: 6, lower: 17 },
		'aeolian':									{ upper: 5, lower: 17 },
		'altered-dorian':							{ upper: 4, lower: 15 },
		'altered':									{ upper: 8, lower: 19 },
		'arabian':									{ upper: 7, lower: 18 },
		'augmented-heptatonic':						{ upper: 2, lower: 13 },
		'augmented':								{ upper: 2, lower: 14 },
		'balinese':									{ upper: 6, lower: 17 },
		'bebop-locrian':							{ upper: 7, lower: 19 },
		'bebop-major':								{ upper: 2, lower: 14 },
		'bebop-minor':								{ upper: 4, lower: 16 },
		'bebop':									{ upper: 2, lower: 14 },
		'blues':									{ upper: 6, lower: 17 },
		'chinese':									{ upper: 1, lower: 13 },
		'chromatic':								{ upper: 0, lower: 20 },
		'composite-blues':							{ upper: 5, lower: 16 },
		'diminished-whole-tone':					{ upper: 8, lower: 19 },
		'diminished':								{ upper: 5, lower: 16 },
		'dominant-diminished':						{ upper: 4, lower: 15 },
		'dominant':									{ upper: 3, lower: 15 },
		'dorian-4':									{ upper: 4, lower: 15 },
		'dorian-b2':								{ upper: 5, lower: 16 },
		'dorian':									{ upper: 4, lower: 16 },
		'double-harmonic-lydian':					{ upper: 2, lower: 13 },
		'double-harmonic-major':					{ upper: 3, lower: 14 },
		'egyptian':									{ upper: 4, lower: 16 },
		'enigmatic':								{ upper: 7, lower: 18 },
		'flamenco':									{ upper: 6, lower: 17 },
		'flat-six-pentatonic':						{ upper: 2, lower: 14 },
		'flat-three-pentatonic':					{ upper: 2, lower: 14 },
		'gypsy':									{ upper: 3, lower: 14 },
		'half-diminished':							{ upper: 6, lower: 18 },
		'half-whole-diminished':					{ upper: 4, lower: 15 },
		'harmonic-major':							{ upper: 3, lower: 14 },
		'harmonic-minor':							{ upper: 5, lower: 16 },
		'hindu':									{ upper: 4, lower: 16 },
		'hirajoshi':								{ upper: 5, lower: 17 },
		'hungarian-major':							{ upper: 1, lower: 13 },
		'hungarian-minor':							{ upper: 3, lower: 15 },
		'ichikosucho':								{ upper: 3, lower: 14 },
		'in-sen':									{ upper: 6, lower: 18 },
		'indian':									{ upper: 3, lower: 15 },
		'ionian-5':									{ upper: 2, lower: 13 },
		'ionian-augmented':							{ upper: 2, lower: 13 },
		'ionian-pentatonic':						{ upper: 2, lower: 14 },
		'ionian':									{ upper: 2, lower: 14 },
		'iwato':									{ upper: 7, lower: 19 },
		'kafi-raga':								{ upper: 3, lower: 15 },
		'kumoi':									{ upper: 4, lower: 16 },
		'kumoijoshi':								{ upper: 6, lower: 18 },
		'leading-whole-tone':						{ upper: 1, lower: 13 },
		'locrian-2':								{ upper: 7, lower: 18 },
		'locrian-6':								{ upper: 7, lower: 18 },
		'locrian-major':							{ upper: 7, lower: 18 },
		'locrian-natural-6':						{ upper: 7, lower: 18 },
		'locrian-pentatonic':						{ upper: 7, lower: 19 },
		'locrian-sharp-6':							{ upper: 7, lower: 18 },
		'locrian':									{ upper: 7, lower: 19 },
		'lydian-5p-pentatonic':						{ upper: 1, lower: 12 },
		'lydian-9':									{ upper: 1, lower: 12 },
		'lydian-augmented':							{ upper: 1, lower: 12 },
		'lydian-b7':								{ upper: 2, lower: 13 },
		'lydian-diminished':						{ upper: 2, lower: 13 },
		'lydian-dominant-pentatonic':				{ upper: 2, lower: 13 },
		'lydian-dominant':							{ upper: 2, lower: 13 },
		'lydian-minor':								{ upper: 2, lower: 13 },
		'lydian-pentatonic':						{ upper: 1, lower: 13 },
		'lydian':									{ upper: 1, lower: 13 },
		'major-5':									{ upper: 2, lower: 13 },
		'major-augmented':							{ upper: 2, lower: 13 },
		'major-blues':								{ upper: 3, lower: 14 },
		'major-pentatonic':							{ upper: 2, lower: 14 },
		'major':									{ upper: 2, lower: 14 },
		'malkos-raga':								{ upper: 6, lower: 18 },
		'melodic-minor-fifth-mode':					{ upper: 5, lower: 16 },
		'melodic-minor-second-mode':				{ upper: 5, lower: 17 },
		'melodic-minor':							{ upper: 5, lower: 16 },
		'messiaens-mode-1':							{ upper: 1, lower: 14 },
		'messiaens-mode-2':							{ upper: 4, lower: 15 },
		'messiaens-mode-3':							{ upper: 3, lower: 15 },
		'messiaens-mode-4':							{ upper: 4, lower: 15 },
		'messiaens-mode-5':							{ upper: 2, lower: 17 },
		'messiaens-mode-6':							{ upper: 1, lower: 12 },
		'messiaens-mode-7':							{ upper: 4, lower: 15 },
		'minor-7m-pentatonic':						{ upper: 5, lower: 16 },
		'minor-bebop':								{ upper: 5, lower: 16 },
		'minor-blues':								{ upper: 6, lower: 17 },
		'minor-hexatonic':							{ upper: 5, lower: 16 },
		'minor-pentatonic':							{ upper: 5, lower: 17 },
		'minor-seven-flat-five-pentatonic':			{ upper: 6, lower: 17 },
		'minor-six-diminished':						{ upper: 4, lower: 15 },
		'minor-six-pentatonic':						{ upper: 5, lower: 17 },
		'minor':									{ upper: 5, lower: 17 },
		'mixolydian-b6':							{ upper: 4, lower: 15 },
		'mixolydian-pentatonic':					{ upper: 3, lower: 15 },
		'mixolydian':								{ upper: 3, lower: 15 },
		'mystery-1':								{ upper: 7, lower: 18 },
		'neopolitan-major-pentatonic':				{ upper: 4, lower: 18 },
		'neopolitan-major':							{ upper: 5, lower: 16 },
		'oriental':									{ upper: 5, lower: 17 },
		'overtone':									{ upper: 2, lower: 14 },
		'pelog':									{ upper: 6, lower: 18 },
		'pentatonic':								{ upper: 2, lower: 14 },
		'persian':									{ upper: 6, lower: 18 },
		'phrygian-6':								{ upper: 6, lower: 17 },
		'phrygian-dominant':						{ upper: 6, lower: 17 },
		'phrygian-major':							{ upper: 6, lower: 17 },
		'phrygian':									{ upper: 6, lower: 18 },
		'piongio':									{ upper: 2, lower: 17 },
		'pomeroy':									{ upper: 8, lower: 19 },
		'prometheus-neopolitan':					{ upper: 2, lower: 15 },
		'prometheus':								{ upper: 2, lower: 14 },
		'purvi-raga':								{ upper: 4, lower: 15 },
		'ritusen':									{ upper: 3, lower: 15 },
		'romanian-minor':							{ upper: 4, lower: 15 },
		'scriabin':									{ upper: 3, lower: 14 },
		'six-tone-symmetric':						{ upper: 2, lower: 15 },
		'spanish-heptatonic':						{ upper: 6, lower: 17 },
		'spanish':									{ upper: 6, lower: 17 },
		'super-locrian-pentatonic':					{ upper: 8, lower: 19 },
		'super-locrian':							{ upper: 8, lower: 19 },
		'superlocrian-bb7':							{ upper: 8, lower: 19 },
		'superlocrian-diminished':					{ upper: 8, lower: 19 },
		'todi-raga':								{ upper: 6, lower: 17 },
		'ukrainian-dorian':							{ upper: 4, lower: 15 },
		'ultralocrian':								{ upper: 8, lower: 19 },
		'vietnamese-1':								{ upper: 4, lower: 19 },
		'vietnamese-2':								{ upper: 5, lower: 17 },
		'whole-half-diminished':					{ upper: 5, lower: 16 },
		'whole-tone-pentatonic':					{ upper: 1, lower: 12 },
		'whole-tone':								{ upper: 2, lower: 14 }
	};
}