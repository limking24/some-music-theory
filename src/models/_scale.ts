import { ScaleTonicRange } from './scale-tonic-range';

export class Scale {

	public constructor(public readonly key: string,
						public readonly display: string,
						public readonly aliases: string[],
						public readonly notesPerOctave: number,
						public readonly tonicRange: ScaleTonicRange) {}

}