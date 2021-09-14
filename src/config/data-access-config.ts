import { DexieScaleDao, ScaleDao } from '@/data-access/scale-dao';
import { TonalScaleNameDao, ScaleNameDao } from '@/data-access/scale-name-dao';
import { TonalScaleTonicRangeDao, ScaleTonicRangeDao } from '@/data-access/scale-tonic-range-dao';

export default [
	{ bind: ScaleDao, to: DexieScaleDao },
	{ bind: ScaleNameDao, to: TonalScaleNameDao },
	{ bind: ScaleTonicRangeDao, to: TonalScaleTonicRangeDao }
];