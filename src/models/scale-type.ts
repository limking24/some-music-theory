import { ScaleTonicRange } from './scale-tonic-range';

export interface ScaleType {
	readonly key: string;
	readonly display: string;
	readonly aliasKeys: string[];
	readonly notesPerOctave: number;
	readonly tonicRange: ScaleTonicRange;
}