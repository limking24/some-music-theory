const Type = {
	major: 'Major', 
	minor: 'Minor'
}

const Mode = {
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

type TypeKey = keyof typeof Type;
type MajorModeKey = keyof typeof Mode.major;
type MinorModeKey = keyof typeof Mode.minor;
type ModeKey = MajorModeKey | MinorModeKey;
type TonicKey = keyof typeof TonicRange;
type Modes = typeof Mode.major | typeof Mode.minor;

export default class Scale {

	public static readonly types = ['Major', 'Minor'];

	public static readonly majorModes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

	public static readonly minorTypes = ['Natural', 'Harmonic', 'Melodic'];

	private static readonly tonicRange = ['Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 
										  'F',  'C',  'G',  'D',  'A',  'E',  'B', 
										  'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];

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
		let keys = [];
		for (let i = startAt; i < startAt + 15; i++) {
			keys.push(Object.keys(TonicRange)[i]);
		}
		return keys as TonicKey[];
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
	public static create(typeKey: string, modeKey: string, tonicKey: string): Scale {
		typeKey = typeKey.toLowerCase();
		modeKey = modeKey.toLowerCase();
		tonicKey = tonicKey.toLowerCase();

		// Scale type
		if (!(typeKey in Type)) {
			typeKey = (modeKey in Mode.minor) ? 'minor' : 'major';
		}
		// Major mode / minor type
		let modeOptions = this.getModes(typeKey as TypeKey);
		if (!(modeKey in modeOptions)) {
			modeKey = Object.keys(modeOptions)[0];
		}
		// Tonic
		let tonicOptions = this.getTonicRange(modeKey as ModeKey) as string[];
		if (!tonicOptions.includes(tonicKey)) {
			tonicKey = tonicOptions[7];
		}
		return new Scale(typeKey as TypeKey, modeKey as ModeKey, tonicKey as TonicKey);
	}

	public constructor(public typeKey: TypeKey, public modeKey: ModeKey, public tonicKey: TonicKey) {}

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