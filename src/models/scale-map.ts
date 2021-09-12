import { ScaleMapRecord } from '@/data-access/record-types';

export class ScaleMap implements ScaleMapRecord {
	
	public constructor(public readonly scaleKey: string,
						public readonly tonalJsScaleName: string) {}

}