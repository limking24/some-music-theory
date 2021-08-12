import { Mode } from '@tonaljs/tonal';

export default class Scale {

	public static readonly types = ['Major', 'Minor'];

	public static readonly majorModes = Mode.names().map(name => name.charAt(0).toUpperCase() + name.slice(1));

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