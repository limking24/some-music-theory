import { TonalJsScaleRecord } from '@/data-access/record-types';
import { ScaleTonicRange } from './scale-tonic-range';

export class TonalJsScale implements TonalJsScaleRecord {

	public constructor(public readonly name: string,
						public readonly notesPerOctave: number,
						public readonly tonicRange: ScaleTonicRange) {}

}