export const Type = {
	major: 'Major', 
	minor: 'Minor'
}

export const Mode = {
	major: {
		ionian:			'Ionian', 
		dorian:			'Dorian', 
		phrygian:		'Phrygian', 
		lydian:			'Lydian', 
		mixolydian:		'Mixolydian', 
		aeolian:		'Aeolian', 
		locrian:		'Locrian'
	},
	minor: {
		natural:		'Natural', 
		harmonic:		'Harmonic', 
		melodic:		'Melodic'
	}
}

export const TonicRange = {
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

export type TypeKey = keyof typeof Type;
export type MajorModeKey = keyof typeof Mode.major;
export type MinorModeKey = keyof typeof Mode.minor;
export type ModeKey = MajorModeKey | MinorModeKey;
export type Modes = typeof Mode.major | typeof Mode.minor;
export type TonicKey = keyof typeof TonicRange;

export class Scale {

	public constructor(public typeKey: TypeKey, public modeKey: ModeKey, public tonicKey: TonicKey) {}

	public static isMajor(scale: TypeKey | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.typeKey : scale;
		return type === 'major';
	}

	public static isMinor(scale: TypeKey | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.typeKey : scale;
		return type === 'minor';
	}

	public static getModes(typeKey: TypeKey): Modes {
		if (this.isMajor(typeKey)) {
			return Mode.major;
		} else {
			return Mode.minor;
		}
	}

	public static getTonicRange(modeKey: ModeKey): TonicKey[] {
		let startAt;
		switch(modeKey) {
			case 'ionian':		startAt = 1;		break;
			case 'dorian':		startAt = 3;		break;
			case 'phrygian':	startAt = 5;		break;
			case 'lydian':		startAt = 0;		break;
			case 'mixolydian':	startAt = 2;		break;
			case 'aeolian':		startAt = 4;		break;
			case 'locrian':		startAt = 6;		break;
			case 'natural':		startAt = 1;		break;
			case 'harmonic':	startAt = 1;		break;
			case 'melodic':		startAt = 1;		break;
		}
		return Object.keys(TonicRange).slice(startAt, startAt + 15) as TonicKey[];
	}

	/**
	 * Creates a Scale. Default values will be used if arguments are invalid.
	 * 
	 * @param typeKey If invalid, detect it from mode. If it cannot be 
	 * detected, then it will be 'major'.
	 * 
	 * @param modeKey If invalid, then it will be 'ionian' for major scale or 
	 * 'natural' for minor scale.
	 * 
	 * @param tonicKey If invalid, then it will be the one without any flats 
	 * or sharps in the key signature. For example,  C Ionian has no flats or 
	 * sharps, so 'c' will be the default tonic for major (Ionian) scale.
	 * 
	 * @returns a Scale
	 */
	public static create(typeKey: string, modeKey: string, tonicKey: string): Scale {
		let type: TypeKey, mode: ModeKey, tonic: TonicKey;
		typeKey = typeKey.toLowerCase();
		modeKey = modeKey.toLowerCase();
		tonicKey = tonicKey.toLowerCase();

		// Scale type
		if (typeKey in Type) {
			type = typeKey as TypeKey;
		} else {
			type = (modeKey in Mode.minor) ? 'minor' : 'major';
		}

		// Major mode / minor type
		let modeOptions = this.getModes(type);
		mode = ((modeKey in modeOptions) ? modeKey : Object.keys(modeOptions)[0]) as ModeKey;

		// Tonic
		let tonicOptions = this.getTonicRange(mode) as string[];
		tonic = (tonicOptions.includes(tonicKey) ? tonicKey : tonicOptions[7]) as TonicKey;

		return new Scale(type, mode, tonic);
	}

	public get type(): string {
		return Type[this.typeKey];
	}

	public get mode(): string {
		if (this.modeKey in Mode.major) {
			return Mode.major[this.modeKey as MajorModeKey];
		} else {
			return Mode.minor[this.modeKey as MinorModeKey];
		}
	}

	public get tonic(): string {
		return TonicRange[this.tonicKey];
	}

}