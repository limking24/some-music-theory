import { TonalJsScaleRef } from '@/models/tonaljs-scale-ref';
import { Scale } from '@/models/_scale';
import { Dexie } from 'dexie';
import { OnlyInstantiableByContainer, Singleton } from 'typescript-ioc';
import { create } from './data';

@Singleton
@OnlyInstantiableByContainer
export class SMTDB extends Dexie {

	public scales: Dexie.Table<Scale, string>;

	public tonalJsScaleRefs: Dexie.Table<TonalJsScaleRef, string>;

	public constructor() {
		super('some-music-theory');
		this.version(1).stores({
			scales: '&key, notesPerOctave',
			tonalJsScaleRefs: '&key'
		});
		this.scales = this.table('scales');
		this.tonalJsScaleRefs = this.table('tonalJsScaleRefs');
		this.on('populate', Reflect.apply(this.populate, this, []));
		this.open();
	}

	private populate(): void {
		let data = create();
		this.scales.bulkAdd(data.scales);
		this.tonalJsScaleRefs.bulkAdd(data.tonalJsScaleRefs);
	}

}