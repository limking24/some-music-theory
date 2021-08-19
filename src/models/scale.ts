import { includesIgnoreCase, toTitleCase } from '@/functional/string';

const Type = {
	'major': 'Major', 
	'minor': 'Minor'
}

const Mode = {
	Major: {
		'ionian':		'Ionian', 
		'dorian':		'Dorian', 
		'phrygian':		'Phrygian', 
		'lydian':		'Lydian', 
		'mixolydian':	'Mixolydian', 
		'aeolian':		'Aeolian', 
		'locrian':		'Locrian'
	},
	Minor: {
		'natural':		'Natural', 
		'harmonic':		'Harmonic', 
		'melodic':		'Melodic'
	}
}

const TonicRange = {
	'f-flat':		'Fb',
	'c-flat':		'Cb',
	'g-flat':		'Gb',
	'd-flat':		'Db',
	'a-flat':		'Ab',
	'e-flat':		'Eb',
	'b-flat':		'Bb',
	'f':			'F',
	'c':			'C',
	'g':			'G',
	'd':			'D',
	'a':			'A',
	'e':			'E',
	'b':			'B',
	'f-sharp':		'F#',
	'c-sharp':		'C#',
	'g-sharp':		'G#',
	'd-sharp':		'D#',
	'a-sharp':		'A#',
	'e-sharp':		'E#',
	'b-sharp':		'B#'
}

type arg0 = keyof typeof Type;
type arg1 = keyof typeof Mode.Major;
type arg1_2 = keyof typeof Mode.Minor;
type arg2 = keyof typeof TonicRange;

export default class Scale {

	public static readonly types = ['Major', 'Minor'];

	public static readonly majorModes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

	public static readonly minorTypes = ['Natural', 'Harmonic', 'Melodic'];

	private static readonly tonicRange = ['Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 
										  'F',  'C',  'G',  'D',  'A',  'E',  'B', 
										  'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];

	public static isMajor(scale: string | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.type : scale;
		return type.toLowerCase() === 'major';
	}

	public static isMinor(scale: string | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.type : scale;
		return type.toLowerCase() === 'minor';
	}

	public static getModes(type: string): string[] {
		if (Scale.isMajor(type)) {
			return Scale.majorModes;
		} else if (Scale.isMinor(type)) {
			return Scale.minorTypes;
		} else {
			return [];
		}
	}

	public static detectType(mode: string): string {
		if (includesIgnoreCase(this.majorModes, mode)) {
			return 'Major';
		} else if (includesIgnoreCase(this.minorTypes, mode)) {
			return 'Minor';
		} else {
			return '';
		}
	}

	public static getTonicRange(mode: string): string[] {
		let tonicIndex;
		switch(mode.toLowerCase()) {
			case 'ionian':		tonicIndex = 8;		break;
			case 'dorian':		tonicIndex = 10;	break;
			case 'phrygian':	tonicIndex = 12;	break;
			case 'lydian':		tonicIndex = 7;		break;
			case 'mixolydian':	tonicIndex = 9;		break;
			case 'aeolian':		tonicIndex = 11;	break;
			case 'locrian':		tonicIndex = 13;	break;
			case 'natural':		tonicIndex = 8;		break;
			case 'harmonic':	tonicIndex = 8;		break;
			case 'melodic':		tonicIndex = 8;		break;
			default:			return [];
		}
		return Scale.tonicRange.slice(tonicIndex - 7, tonicIndex + 8);
	}

	/**
	 * Creates a valid Scale. Default values will be used if arguments 
	 * are not supplied or invalid.
	 * 
	 * @param type If unprovided or invalid, detect it from mode. 
	 * If it cannot be detected, then it will be 'Major'.
	 * 
	 * @param mode If unprovided or invalid, then it will be 'Ionian'
	 * for major scale or 'Natural' for minor scale.
	 * 
	 * @param tonic If unprovided or invalid, then it will be the one
	 * without any flats or sharps in the key signature. For example,
	 * C Ionian has no flats or sharps, so it will be the default tonic
	 * for major (Ionian) scale.
	 * 
	 * @returns a valid Scale
	 */
	public static create(type: string, mode: string, tonic: string): Scale {
		// Scale type
		if (!includesIgnoreCase(Scale.types, type)) {
			type = Scale.detectType(mode);
			if (type == '') {
				type = 'Major';
			}
		}
		// Major mode / minor type
		let modeOptions = Scale.getModes(type);
		if (!includesIgnoreCase(modeOptions, mode)) {
			mode = modeOptions[0];
		}
		// Tonic
		let tonicOptions = Scale.getTonicRange(mode);
		if (!includesIgnoreCase(tonicOptions, tonic)) {
			tonic = tonicOptions[7];
		}
		return new Scale(toTitleCase(type), toTitleCase(mode), toTitleCase(tonic));
	}

	public constructor(public type: string, public mode: string, public tonic: string) {}

}