import { Pair } from './pair';

export interface MajorMinorScale {
	type: string;
	subtype: string;
	tonic: string;
}

export const Types: Record<string, string> = {
	'major':			'Major',
	'minor':			'Minor'	
};

export const MajorSubtypes: Record<string, string> = {
	'ionian':			'Ionian', 
	'dorian':			'Dorian', 
	'phrygian':			'Phrygian', 
	'lydian':			'Lydian', 
	'mixolydian':		'Mixolydian', 
	'aeolian':			'Aeolian', 
	'locrian':			'Locrian'
};

export const MinorSubtypes: Record<string, string> = {
	'natural':			'Natural',
	'harmonic':			'Harmonic',
	'melodic':			'Melodic'
}

/**
 * Used to create tonic options.
 */
const Tonics: Pair<string, string>[] = [
	{ key: 'f-flat',		value: 'Fb' },
	{ key: 'c-flat',		value: 'Cb' },
	{ key: 'g-flat',		value: 'Gb' },
	{ key: 'd-flat',		value: 'Db' },
	{ key: 'a-flat',		value: 'Ab' },
	{ key: 'e-flat',		value: 'Eb' },
	{ key: 'b-flat',		value: 'Bb' },
	{ key: 'f',				value: 'F' },
	{ key: 'c',				value: 'C' },
	{ key: 'g',				value: 'G' },
	{ key: 'd',				value: 'D' },
	{ key: 'a',				value: 'A' },
	{ key: 'e',				value: 'E' },
	{ key: 'b',				value: 'B' },
	{ key: 'f-sharp',		value: 'F#' },
	{ key: 'c-sharp',		value: 'C#' },
	{ key: 'g-sharp',		value: 'G#' },
	{ key: 'd-sharp',		value: 'D#' },
	{ key: 'a-sharp',		value: 'A#' },
	{ key: 'e-sharp',		value: 'E#' },
	{ key: 'b-sharp',		value: 'B#' }
];

/**
 * Used to create tonic options.
 */
 const Accidentals = [
	' (bbbbbbb)',
	' (bbbbbb)',
	' (bbbbb)',
	' (bbbb)',
	' (bbb)',
	' (bb)',
	' (b)',
	'',
	' (#)',
	' (##)',
	' (###)',
	' (####)',
	' (#####)',
	' (######)',
	' (#######)'
];

export interface Tonic {
	value: string;
	display: string;
}

/**
 * Create tonic options according to the subtype.
 * 
 * For example, the options for major ionian will be:
 * ```
 * {
 *   'ionian c-flat' : 			{ value: c-flat', 		display: 'Cb (bbbbbbb)' },
 *   'ionian g-flat' : 			{ value: g-flat', 		display: 'Gb (bbbbbb)' },
 *   'ionian d-flat' : 			{ value: d-flat', 		display: 'Db (bbbbb)' },
 *   'ionian a-flat' : 			{ value: a-flat', 		display: 'Ab (bbbb)' },
 *   'ionian e-flat' : 			{ value: e-flat', 		display: 'Eb (bbb)' },
 *   'ionian b-flat' : 			{ value: b-flat', 		display: 'Bb (bb)' },
 *   'ionian f' : 				{ value: f', 			display: 'F (b)' },
 *   'ionian c' : 				{ value: c', 			display: 'C' },
 *   'ionian g' : 				{ value: g', 			display: 'G (#)' },
 *   'ionian d' : 				{ value: d', 			display: 'D (##)' },
 *   'ionian a' : 				{ value: a', 			display: 'A (###)' },
 *   'ionian e' : 				{ value: e', 			display: 'E (####)' },
 *   'ionian b' : 				{ value: b', 			display: 'B (#####)' },
 *   'ionian f-sharp' : 		{ value: f-sharp', 		display: 'F# (######)' },
 *   'ionian c-sharp' : 		{ value: c-sharp', 		display: 'C# (#######)' }
 * }
 * ```
 * 
 * @param subtype scale subtype
 * @returns tonic options
 */
 export function createTonics(subtype: string): Record<string, Tonic> {
	let start;
	switch(subtype) {
		case 'ionian':		start = 1;	break;
		case 'dorian':		start = 3;	break;
		case 'phrygian':	start = 5;	break;
		case 'lydian':		start = 0;	break;
		case 'mixolydian':	start = 2;	break;
		case 'aeolian':		start = 4;	break;
		case 'locrian':		start = 6;	break;
		case 'natural':		start = 4;	break;
		case 'harmonic':	start = 4;	break;
		case 'melodic':		start = 4;	break;
		default: return {};
	}
	return Tonics
			.slice(start, start + 15)
			.reduce((options, tonic, index) => {
				options[`${subtype} ${tonic.key}`] = { 
					value: tonic.key, 
					display: tonic.value + Accidentals[index] 
				};
				return options;
			}, {} as Record<string, Tonic>);
}