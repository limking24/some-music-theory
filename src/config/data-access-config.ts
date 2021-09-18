import { DexieScaleDao, ScaleDao } from '@/data-access/scale-dao';

export default [
	{ bind: ScaleDao, to: DexieScaleDao }
];