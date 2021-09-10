import { TonalScaleNameDao, ScaleNameDao } from '@/data-access/scale-name-dao';
import { TonalScaleTonicRangeDao, ScaleTonicRangeDao } from '@/data-access/scale-tonic-range-dao';

export default [
	{ bind: ScaleNameDao, to: TonalScaleNameDao },
	{ bind: ScaleTonicRangeDao, to: TonalScaleTonicRangeDao }
];