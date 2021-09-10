import { ScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleName } from '@/models/scale-name';
import { ScaleNotesTableInfo } from '@/models/scale-notes-table-info';
import { Inject, Singleton } from 'typescript-ioc';
import { ScaleNotesTableRowFactory } from './scale-notes-table-row-factory';

export abstract class ScaleNotesTableInfoFactory {
	
	public abstract create(scaleName: ScaleName): ScaleNotesTableInfo;

}

@Singleton
export class TonalScaleNotesTableFactory extends ScaleNotesTableInfoFactory {

	public constructor(@Inject private _nameDao: ScaleNameDao,
						@Inject private _rowFactory: ScaleNotesTableRowFactory) {
		super();
	}

	public create(scaleName: ScaleName): ScaleNotesTableInfo {
		let rows = this._rowFactory.create(scaleName.key);
		return new ScaleNotesTableInfo(
			scaleName,
			this._nameDao.aliasesOf(scaleName.key),
			rows
		);
	}
	
}