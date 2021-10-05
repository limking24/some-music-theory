import { onStop, Sampler } from './sampler';
import { PlaySymbol, SamplerPlayButton, StopSymbol } from './sampler-play-button';

export type onPlay = (sampler: Sampler, onStop: onStop) => void;

export class DomBasedSamplerPlayButton implements SamplerPlayButton {

	public constructor(private _element: HTMLElement, private _sampler: Sampler, private _onPlay: onPlay) {
		_element.textContent = PlaySymbol;
		_element.style.cursor = 'pointer';
		_element.addEventListener('click', () => {
			if (_element.textContent === PlaySymbol) {
				this.play();
			} else {
				this.stop();
			}
		});
	}

	public play(): void {
		this._element.textContent = StopSymbol;
		this._onPlay(this._sampler, this.onSamplerStopped.bind(this));
	}

	public stop(): void {
		this._sampler.stop();
	}

	public onSamplerStopped(): void {
		this._element.textContent = PlaySymbol;
	}
	
}