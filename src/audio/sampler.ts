import { redenoteAll } from '@/functional/tonejs';
import router from '@/router';
import * as Tone from 'tone';
import { Transport } from 'tone/build/esm/core/clock/Transport';
import { InjectValue, Singleton } from 'typescript-ioc';

export type onStop = () => void;

export interface Optional {
	duration?: number,
	onStop?: onStop;
}

@Singleton
export class Sampler {

	private _transport = new Transport(Transport.getDefaults());

	private _sampler: Tone.Sampler;

	private _onStop?: onStop;

	public constructor(@InjectValue('sampler.samples') samples: Record<string, string>) {
		this._sampler = new Tone.Sampler({
			urls: samples,
			onload: () => {
				// Stop the sampler when route changes
				router.beforeEach((to, from, next) => {
					this.stop();
					next();
				});
			}
		}).toDestination();
	}

	public async play(notes: (string|string[])[], optional?: Optional): Promise<void> {
		await Promise.all([Tone.start(), Tone.loaded()]);
		await this.stop();
		this._onStop = optional?.onStop;
		let delay = 0.1;
		let duration = optional?.duration ? optional.duration : 0.5;
		redenoteAll(notes).forEach(n => {
			this._transport.scheduleOnce(time => this._sampler.triggerAttackRelease(n, duration, time), delay);
			delay += duration;
		});
		this._transport.scheduleOnce(time => this.stop(), delay);
		this._transport.start();
	}

	public stop(): Promise<void> {
		if (this._transport.state !== 'stopped') {
			// Stop and remove all scheduled events
			this._transport.stop();
			this._transport.cancel();
			if (this._onStop) {
				this._onStop();
				this._onStop = undefined;
			}
			// Give a little pause in case the sampler will be played right after this
			return new Promise(resolve => setTimeout(() => resolve(), 500));
		}
		return Promise.resolve();
	}

}