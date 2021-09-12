import { ScaleTonicRange } from '@/models/scale-tonic-range';

export interface ScaleRecord {
	key: string;
	display: string;
	aliasKeys: string[];
}

export interface TonalJsScaleRecord {
	name: string;
	notesPerOctave: number;
	tonicRange: ScaleTonicRange;
}

export interface ScaleMapRecord {
	scaleKey: string;
	tonalJsScaleName: string;
}