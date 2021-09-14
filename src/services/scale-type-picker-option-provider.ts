import { ScaleDao } from '@/data-access/scale-dao';
import { Options } from '@/models/options';
import { createSupertypeOptions, createTypeOptions, ScaleSupertype, ScaleType } from '@/models/scale-type-picker';
import { Inject, Singleton } from 'typescript-ioc';

export abstract class ScaleTypePickerOptionProvider {

	public abstract getSupertypesExclude(...exclude: ScaleSupertype[]): Promise<Options>;

	public abstract getTypes(supertype: ScaleSupertype): Promise<Options<ScaleType>>;

}

@Singleton
export class DbBasedScaleTypePickerOptionProvider extends ScaleTypePickerOptionProvider{

	public constructor(@Inject private _scaleDao: ScaleDao) {
		super();
	}

	public async getSupertypesExclude(...exclude: ScaleSupertype[]): Promise<Options> {
		let supertypes = await this._scaleDao.supertypes();
		let filtered = supertypes.filter(supertype => !exclude.includes(supertype));
		return createSupertypeOptions(filtered);
	}

	public async getTypes(supertype: ScaleSupertype): Promise<Options<ScaleType>> {
		let types = await this._scaleDao.getBySupertype(supertype);
		return createTypeOptions(types);
	}

}