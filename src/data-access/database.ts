import { Dexie } from 'dexie';
import { OnlyInstantiableByContainer, Singleton } from 'typescript-ioc';
import { create } from './data';
import { ScaleMapRecord, ScaleRecord, TonalJsScaleRecord } from './record-types';

@Singleton
@OnlyInstantiableByContainer
export class SMTDB extends Dexie {

	public scales: Dexie.Table<ScaleRecord, string>;

	public tonalJsScales: Dexie.Table<TonalJsScaleRecord, string>;

	public scaleMap: Dexie.Table<ScaleMapRecord, string>;

	public constructor() {
		super('some-music-theory');
		this.version(1).stores({
			scales: '&key',
			tonalJsScales: '&name, notesPerOctave',
			scaleMap: '&scaleKey'
		});
		this.scales = this.table('scales');
		this.tonalJsScales = this.table('tonalJsScales');
		this.scaleMap = this.table('scaleMap');
		this.on('populate', Reflect.apply(this.populate, this, []));
		this.open();
	}

	private populate(): void {
		let data = create();
		this.scales.bulkAdd(data.scales);
		this.scaleMap.bulkAdd(data.scaleMap);
		this.tonalJsScales.bulkAdd(data.tonalJsScales);
	}

}