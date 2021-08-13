export default class Scale {

	public static readonly types = ['Major', 'Minor'];

	public static readonly majorModes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

	public static readonly minorTypes = ['Natural', 'Harmonic', 'Melodic'];

	public static isMajor(scale: String | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.type : scale;
		return type.toLocaleLowerCase() === 'major';
	}

	public static isMinor(scale: String | Scale): boolean {
		let type = (scale instanceof Scale) ? scale.type : scale;
		return type.toLocaleLowerCase() === 'minor';
	}

	public constructor(public type: String, public mode: String, public tonic: String) {}

}