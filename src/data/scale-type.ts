import { ScaleTonicRange } from '../models/scale-tonic-range';

export interface ScaleType {
	readonly key: string;
	readonly display: string;
	readonly aliasKeys: string[];
	readonly supertype: number;
	readonly tonicRange: ScaleTonicRange;
}