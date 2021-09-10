import { InMemoryTonalScaleNameDao, ScaleNameDao } from '@/data-access/scale-name-dao';
import { InMemoryScaleTonicRangeDao, ScaleTonicRangeDao } from '@/data-access/scale-tonic-range-dao';

export default [
	{ bind: ScaleTonicRangeDao, to: InMemoryScaleTonicRangeDao },
	{ bind: ScaleNameDao, to: InMemoryTonalScaleNameDao }
];