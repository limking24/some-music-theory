export class Chroma {

	private _value = new Array<boolean>(12).fill(false);

	public get value(): boolean[] {
		return this._value;
	}

	public get noOfNotes(): number {
		return this._value.filter(Boolean).length;
	}

	public valueOf(index: number): boolean {
		return this._value[index];
	}

	public toggle(index: number): void {
		this._value[index] = !this._value[index];
	}

	public reset(): void {
		this._value.fill(false);
	}

	public clone(): Chroma {
		let chroma = new Chroma();
		chroma._value = [...this._value];
		return chroma;
	}

}