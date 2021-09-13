import { ScaleType } from '@/data/scale-type';
import { ScaleTypeRef } from '@/data/scale-type-ref';
import { Dexie } from 'dexie';
import { OnlyInstantiableByContainer, Singleton } from 'typescript-ioc';
import { create } from '../data/data';

@Singleton
@OnlyInstantiableByContainer
export class SMTDB extends Dexie {

	public scaleTypes: Dexie.Table<ScaleType, string>;

	public scaleTypeRefs: Dexie.Table<ScaleTypeRef, string>;

	public constructor() {
		super('some-music-theory');
		this.version(1).stores({
			scaleTypes: '&key, supertype',
			scaleTypeRefs: '&key'
		});
		this.scaleTypes = this.table('scaleTypes');
		this.scaleTypeRefs = this.table('scaleTypeRefs');
		this.on('populate', Reflect.apply(this.populate, this, []));
		this.open();
	}

	private populate(): void {
		let data = create();
		this.scaleTypes.bulkAdd(data.scaleTypes);
		this.scaleTypeRefs.bulkAdd(data.scaleTypeRefs);
	}

}