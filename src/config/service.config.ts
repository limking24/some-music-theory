import { ScaleNameDao, TonalScaleNameDao } from '@/data-access/scale-name-dao';
import { ScaleNameProvider, TonalScaleNameProvider } from '@/services/scale-name-provider';
import { HighlightableVexFlowScaleTriadsScoreDrawer, ScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';

export default [
	{ bind: ScaleNameDao, to: TonalScaleNameDao },
	{ bind: ScaleNameProvider, to: TonalScaleNameProvider },
	// Scale Triads Score
	{ bind: ScaleTriadsScoreDrawer, to: HighlightableVexFlowScaleTriadsScoreDrawer },
	{ bindName: 'scale.triads.score.element.id', to: 'vexflow-scale-triads-score' },
	{ bindName: 'scale.triads.score.width', to: 765 }
];