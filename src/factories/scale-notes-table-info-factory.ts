import { ScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleName } from '@/models/scale-name';
import { ScaleNotesTableInfo } from '@/models/scale-notes-table-info';
import { Inject, Singleton } from 'typescript-ioc';
import { ScaleNotesTableRowFactory } from './scale-notes-table-row-factory';

@Singleton
export class ScaleNotesTableInfoFactory {

	public constructor(@Inject private _nameDao: ScaleNameDao,
						@Inject private _rowFactory: ScaleNotesTableRowFactory) {}

	public create(scaleName: ScaleName): ScaleNotesTableInfo {
		return new ScaleNotesTableInfo(
			scaleName,
			this._nameDao.aliasesOf(scaleName.key),
			this._rowFactory.create(scaleName.key)
		);
	}
	
}