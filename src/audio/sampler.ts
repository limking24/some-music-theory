import { redenoteAll } from '@/functional/tonejs';
import router from '@/router';
import AsyncLock from 'async-lock';
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

	private _lock = new AsyncLock();

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
		this._lock.acquire('sampler', async () => {
			await Promise.all([Tone.start(), Tone.loaded()]);
			this.reset();
			this._onStop = optional?.onStop;
			let duration = optional?.duration ? optional.duration : 0.5;
			let delay = 0.1;
			redenoteAll(notes).forEach(n => {
				this._transport.scheduleOnce(time => this._sampler.triggerAttackRelease(n, duration, time), delay);
				delay += duration;
			});
			this._transport.scheduleOnce(time => this.stop(), delay);
			this._transport.start();
		});
	}

	public stop(): void {
		this._lock.acquire('sampler', () => {
			this.reset();
		});
	}

	/**
	 * Stop the sampler and remove all scheduled events.
	 */
	private reset(): void {
		if (this._transport.state !== 'stopped') {
			this._transport.stop();
			this._transport.cancel();
			if (this._onStop) {
				this._onStop();
				this._onStop = undefined;
			}
		}
	}

}