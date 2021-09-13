import { TonalJsScaleRef } from '@/models/tonaljs-scale-ref';
import { ScaleType } from '@/models/scale-type';
import { Dexie } from 'dexie';
import { OnlyInstantiableByContainer, Singleton } from 'typescript-ioc';
import { create } from './data';

@Singleton
@OnlyInstantiableByContainer
export class SMTDB extends Dexie {

	public scaleTypes: Dexie.Table<ScaleType, string>;

	public tonalJsScaleRefs: Dexie.Table<TonalJsScaleRef, string>;

	public constructor() {
		super('some-music-theory');
		this.version(1).stores({
			scaleTypes: '&key, notesPerOctave',
			tonalJsScaleRefs: '&key'
		});
		this.scaleTypes = this.table('scaleTypes');
		this.tonalJsScaleRefs = this.table('tonalJsScaleRefs');
		this.on('populate', Reflect.apply(this.populate, this, []));
		this.open();
	}

	private populate(): void {
		let data = create();
		this.scaleTypes.bulkAdd(data.scaleTypes);
		this.tonalJsScaleRefs.bulkAdd(data.tonalJsScaleRefs);
	}

}