export const PlaySymbol = '\u200A▶';

export const StopSymbol = '◼';

export interface SamplerPlayButton {

	/**
	 * Play the sampler and change the button to a stop button.
	 */
	play: () => void;

	/**
	 * Stop the sampler.
	 */
	stop: () => void;

	/**
	 * To be invoked by the sampler when it is stopped. The stop
	 * event will be fired when 1) all the notes are played,
	 * 2) the stop button is hit, or 3) other play button is hit.
	 * The stop button should be changed to a play button here.
	 */
	onSamplerStopped: () => void;

}