import router from '@/router';
import { Note } from '@tonaljs/tonal';
import AsyncLock from 'async-lock';
import * as Tone from 'tone';
import { Sampler } from 'tone';
import { Transport } from 'tone/build/esm/core/clock/Transport';
import { Inject, Singleton } from 'typescript-ioc';

export type onStop = () => void;

export interface Optional {
	duration?: number,
	onStop?: onStop;
}

@Singleton
export class SamplerFacade {

	private _lock = new AsyncLock();

	private _transport = new Transport(Transport.getDefaults());

	private _onStop?: onStop;

	public constructor(@Inject private _sampler: Sampler, stopOnRouteChanged = true) {
		if (stopOnRouteChanged) {
			router.beforeEach((to, from, next) => {
				this.stop();
				next();
			});
		}
	}

	public async play(notes: (string|string[])[], optional?: Optional): Promise<void> {
		this._lock.acquire('sampler', async () => {
			await Promise.all([Tone.start(), Tone.loaded()]);
			let wasPlaying = this.reset();
			this._onStop = optional?.onStop;
			let duration = optional?.duration ? optional.duration : 0.5;
			let delay = wasPlaying ? 0.5 : 0.1;
			notes.forEach(n => {
				let redenoted = (typeof n === 'string') ? Note.enharmonic(n) : n.map(note => Note.enharmonic(note));
				this._transport.scheduleOnce(time => this._sampler.triggerAttackRelease(redenoted, duration, time), delay);
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
	private reset(): boolean {
		if (this._transport.state !== 'stopped') {
			this._transport.stop();
			this._transport.cancel();
			if (this._onStop) {
				this._onStop();
				this._onStop = undefined;
			}
			return true;
		}
		return false;
	}

}