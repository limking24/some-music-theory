import { ScaleType } from '@/data/scale-type';
import { Dexie } from 'dexie';
import { OnlyInstantiableByContainer, Singleton } from 'typescript-ioc';
import { create } from '../data/data';

@Singleton
@OnlyInstantiableByContainer
export class SMTDB extends Dexie {

	public scaleTypes: Dexie.Table<ScaleType, string>;

	public constructor() {
		super('some-music-theory');
		this.version(1).stores({
			scaleTypes: '&key, supertype'
		});
		this.scaleTypes = this.table('scaleTypes');
		this.on('populate', () => Reflect.apply(this.populate, this, []));
		this.open();
	}

	private populate(): void {
		let data = create();
		this.scaleTypes.bulkAdd(data);
	}

}