import { Optional } from 'typescript-optional';

export class ScaleTonic {

	public static readonly All: Record<string, string> = {
		'f-flat': 			 'Fb',
		'c-flat': 			 'Cb',
		'g-flat': 			 'Gb',
		'd-flat': 			 'Db',
		'a-flat': 			 'Ab',
		'e-flat': 			 'Eb',
		'b-flat': 			 'Bb',
		'f': 				 'F' ,
		'c': 				 'C' ,
		'g': 				 'G' ,
		'd': 				 'D' ,
		'a': 				 'A' ,
		'e': 				 'E' ,
		'b': 				 'B' ,
		'f-sharp': 			 'F#',
		'c-sharp': 			 'C#',
		'g-sharp': 			 'G#',
		'd-sharp': 			 'D#',
		'a-sharp': 			 'A#',
		'e-sharp': 			 'E#',
		'b-sharp': 			 'B#'
	};

	public static get Entries(): [key: string, tonic: string][] {
		return Object.entries(this.All);
	}

	public static tonicKeyOfIndex(index: number): Optional<string> {
		let entry = this.Entries[index];
		return entry ? Optional.of(entry[0]) : Optional.empty();
	}

	public static tonicOfIndex(index: number): Optional<string> {
		let entry = this.Entries[index];
		return entry ? Optional.of(entry[1]) : Optional.empty();
	}

	public static indexOfTonicKey(key: string): number {
		return this.Entries.findIndex(entry => entry[0] === key);
	}

	public static indexOfTonic(tonic: string): number {
		return this.Entries.findIndex(entry => entry[1] === tonic);
	}

}