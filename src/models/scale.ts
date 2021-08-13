import { includesIgnoreCase, toTitleCase } from '@/functional/string';

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
		return Scale.isMinor(type) ? Scale.minorTypes : Scale.majorModes;
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
		let index;
		switch(mode.toLowerCase()) {
			case 'ionian':		index = 8;		break;
			case 'dorian':		index = 10;		break;
			case 'phrygian':	index = 12;		break;
			case 'lydian':		index = 7;		break;
			case 'mixolydian':	index = 9;		break;
			case 'aeolian':		index = 11;		break;
			case 'locrian':		index = 13;		break;
			case 'natural':		index = 8;		break;
			case 'harmonic':	index = 8;		break;
			case 'melodic':		index = 8;		break;
			default:			index = 8;		break;
		}
		return Scale.tonicRange.slice(index - 7, index + 8);
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