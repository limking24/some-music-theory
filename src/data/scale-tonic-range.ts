export class ScaleTonicRange {

	public constructor(public readonly upper: number,
						public readonly lower: number) {}

	public outOfRange(index: number): boolean {
		return index < this.upper || index > this.lower;
	}

}