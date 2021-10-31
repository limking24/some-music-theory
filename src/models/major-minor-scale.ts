import { ScaleTonic } from './scale-tonic';

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
	tonic: string;
	display: string;
}

/**
 * Create tonic options for the given subtype.
 * 
 * For example, the options for major ionian will be:
 * ```
 * {
 *   'c-flat ionian' : 			{ tonic: c-flat', 		display: 'Cb (bbbbbbb)' },
 *   'g-flat ionian' : 			{ tonic: g-flat', 		display: 'Gb (bbbbbb)' },
 *   'd-flat ionian' : 			{ tonic: d-flat', 		display: 'Db (bbbbb)' },
 *   'a-flat ionian' : 			{ tonic: a-flat', 		display: 'Ab (bbbb)' },
 *   'e-flat ionian' : 			{ tonic: e-flat', 		display: 'Eb (bbb)' },
 *   'b-flat ionian' : 			{ tonic: b-flat', 		display: 'Bb (bb)' },
 *   'f ionian' : 				{ tonic: f', 			display: 'F (b)' },
 *   'c ionian' : 				{ tonic: c', 			display: 'C' },
 *   'g ionian' : 				{ tonic: g', 			display: 'G (#)' },
 *   'd ionian' : 				{ tonic: d', 			display: 'D (##)' },
 *   'a ionian' : 				{ tonic: a', 			display: 'A (###)' },
 *   'e ionian' : 				{ tonic: e', 			display: 'E (####)' },
 *   'b ionian' : 				{ tonic: b', 			display: 'B (#####)' },
 *   'f-sharp ionian' : 		{ tonic: f-sharp', 		display: 'F# (######)' },
 *   'c-sharp ionian' : 		{ tonic: c-sharp', 		display: 'C# (#######)' }
 * }
 * ```
 * 
 * @param tonic key of scale subtype
 * @returns tonic options
 */
 export function createScaleKeys(subtype: string): Record<string, Tonic> {
	let upper = getTonicRangeUpperBound(subtype);
	if (upper === -1) {
		return {};
	}
	return ScaleTonic
			.Entries
			.slice(upper, upper + 15)
			.reduce((options, entry, index) => {
				options[`${entry[0]} ${subtype}`] = {
					tonic: entry[0],
					display: entry[1] + Accidentals[index]
				};
				return options;
			}, {} as Record<string, Tonic>);
}

export function getTonicRangeUpperBound(subtype: string): number {
	switch(subtype) {
		case 'ionian':		return 1;
		case 'dorian':		return 3;
		case 'phrygian':	return 5;
		case 'lydian':		return 0;
		case 'mixolydian':	return 2;
		case 'aeolian':		return 4;
		case 'locrian':		return 6;
		case 'natural':		return 4;
		case 'harmonic':	return 4;
		case 'melodic':		return 4;
		default: 			return -1;
	}
}

export function subtypeToRef(subtype: string): string {
	switch (subtype) {
		case 'harmonic':
		case 'melodic':
			return `${subtype} minor`;
		case 'natural':
			return 'minor';
		default:
			return subtype;
	}
}

export function getScaleName(scale: MajorMinorScale): string {
	let tonic = ScaleTonic.All[scale.tonic];
	if (scale.type === 'minor') {
		if (scale.subtype === 'natural') {
			return `${tonic} Minor Scale`;
		} else {
			return `${tonic} ${MinorSubtypes[scale.subtype]} Minor Scale`;
		}
	} else {
		return `${tonic} ${MajorSubtypes[scale.subtype]} Scale`;
	}
}

export function isValid(scale: MajorMinorScale): boolean {
	if ((scale.type === 'major' && !(scale.subtype in MajorSubtypes)) ||
		(scale.type === 'minor' && !(scale.subtype in MinorSubtypes))) {
		return false;
	}
	let upper = getTonicRangeUpperBound(scale.subtype);
	let lower = upper + 14;
	let index = ScaleTonic.indexOfTonicKey(scale.tonic);
	return index >= upper && index <= lower;
}