import { ScaleTonicRange } from '@/data/scale-type';

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

	public static readonly Enharmonic = ['E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#', undefined, undefined, undefined, 'Fb', 'Cb', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C'];

	public static get Entries(): [key: string, tonic: string][] {
		return Object.entries(this.All);
	}

	public static tonicKeyOfIndex(index: number): string {
		return this.Entries[index][0];
	}

	public static tonicOfIndex(index: number): string {
		return this.Entries[index][1];
	}

	public static indexOfTonicKey(key: string): number {
		return this.Entries.findIndex(entry => entry[0] === key);
	}

	public static indexOfTonic(tonic: string): number {
		return this.Entries.findIndex(entry => entry[1] === tonic);
	}

	public static enharmonicOfTonicIndex(index: number): string | undefined {
		return this.Enharmonic[index];
	}

	public static enharmonicOfTonic(tonic: string): string | undefined {
		return this.Enharmonic[this.indexOfTonic(tonic)];
	}

	public static isWithin(range: ScaleTonicRange, tonic: string): boolean {
		let index = this.indexOfTonic(tonic);
		return range.upper <= index && index <= range.lower;
	}

}