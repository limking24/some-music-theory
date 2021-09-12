import { ScaleRecord } from '@/data-access/record-types';
import { ScaleTonicRange } from './scale-tonic-range';

export class Scale implements ScaleRecord {

	public constructor(public readonly key: string,
						public readonly display: string,
						public readonly aliasKeys: string[],
						public readonly notesPerOctave: number,
						public readonly tonicRange: ScaleTonicRange) {}

}