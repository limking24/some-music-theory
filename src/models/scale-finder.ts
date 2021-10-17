import { toTitleCase } from '@/functional/string';
import { Scale } from '@tonaljs/tonal';

export class MatchedScaleGroup {

	public collapsed = false;

	public constructor(public scales: MatchedScale[]) {}

	public toggleCollapsed(): void {
		this.collapsed = !this.collapsed;
	}

}

export class MatchedScale {

	private _currentTonic: string;

	public readonly name: string;

	public readonly aliases: string[];

	public notes: string[];

	public highlight = false;

	public constructor(public readonly tonic: string,
						public readonly enharmonic: string | undefined,
						public readonly ref: string) {
		let scale = Scale.get(`${tonic} ${ref}`);
		this.notes = scale.notes;
		this.name = toTitleCase(ref);
		this.aliases = scale.aliases.sort((a, b) => a.localeCompare(b)).map(toTitleCase);
		this._currentTonic = tonic;
	}

	public get currentTonic(): string {
		return this._currentTonic;
	}

	public get hasAliases(): boolean {
		return this.aliases.length > 0;
	}

	public showAlternative(): void {
		if (this.enharmonic) {
			this._currentTonic = (this.currentTonic === this.tonic) ? this.enharmonic : this.tonic;
			this.notes = Scale.get(`${this.currentTonic} ${this.ref}`).notes;
		}
	}

	public isCurrent(tonic: string): boolean {
		return this._currentTonic === tonic;
	}

	public toggleHighlight(): void {
		this.highlight = !this.highlight;
	}

}