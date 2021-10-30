export interface ScaleType {
	readonly key: string;
	readonly ref: string;
	readonly display: string;
	readonly aliasKeys: string[];
	readonly supertype: number;
	readonly tonicRange: ScaleTonicRange;
}

export interface ScaleTonicRange {
	readonly upper: number;
	readonly lower: number;
}