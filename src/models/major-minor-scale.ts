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
const Tonics: [string, string][] = [
	[ 'f-flat',			'Fb' ],
	[ 'c-flat',			'Cb' ],
	[ 'g-flat',			'Gb' ],
	[ 'd-flat',			'Db' ],
	[ 'a-flat',			'Ab' ],
	[ 'e-flat',			'Eb' ],
	[ 'b-flat',			'Bb' ],
	[ 'f',				'F' ],
	[ 'c',				'C' ],
	[ 'g',				'G' ],
	[ 'd',				'D' ],
	[ 'a',				'A' ],
	[ 'e',				'E' ],
	[ 'b',				'B' ],
	[ 'f-sharp',		'F#' ],
	[ 'c-sharp',		'C#' ],
	[ 'g-sharp',		'G#' ],
	[ 'd-sharp',		'D#' ],
	[ 'a-sharp',		'A#' ],
	[ 'e-sharp',		'E#' ],
	[ 'b-sharp',		'B#' ]
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

/**
 * Create tonic options according to the subtype.
 * 
 * For example, the options for major ionian will be:
 * ```
 * {
 *   'c-flat',		{ display: 'Cb (bbbbbbb)' } },
 *   'g-flat',		{ display: 'Gb (bbbbbb)' } },
 *   'd-flat',		{ display: 'Db (bbbbb)' } },
 *   'a-flat',		{ display: 'Ab (bbbb)' } },
 *   'e-flat',		{ display: 'Eb (bbb)' } },
 *   'b-flat',		{ display: 'Bb (bb)' } },
 *   'f',			{ display: 'F (b)' } },
 *   'c',			{ display: 'C' } },
 *   'g',			{ display: 'G (#)' } },
 *   'd',			{ display: 'D (##)' } },
 *   'a',			{ display: 'A (###)' } },
 *   'e',			{ display: 'E (####)' } },
 *   'b',			{ display: 'B (#####)' } },
 *   'f-sharp',		{ display: 'F# (######)' } },
 *   'c-sharp',		{ display: 'C# (#######)' } }
 * }
 * ```
 * 
 * @param subtype scale subtype
 * @returns tonic options
 */
 export function createTonics(subtype: string): Record<string, string> {
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
				options[tonic[0]] = tonic[1] + Accidentals[index];
				return options;
			}, {} as Record<string, string>);
}