import { TonalScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleTonicRangeDao } from '@/data-access/scale-tonic-range-dao';
import { ScaleNotesTableRow, tonic } from '@/models/scale-notes-table-row';
import { Scale } from '@tonaljs/tonal';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleNotesTableRowFactory {

	public abstract create(key: string): ScaleNotesTableRow[];

}

@Singleton
export class TonalScaleNotesTableRowFactory extends ScaleNotesTableRowFactory {

	public constructor(@Inject private _nameDao: TonalScaleNameDao,
						 @Inject private _rangeDao: ScaleTonicRangeDao) {
		super();
	}

	public create(key: string): ScaleNotesTableRow[] {
		let ref = this._nameDao.refOf(key);
		let range = this._rangeDao.get(key);
		return tonic.map((note, index) => {
			return new ScaleNotesTableRow(
				index,
				Scale.get(`${note} ${ref}`).notes,
				range
			);
		});
	}

}