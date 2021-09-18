import { ScaleService, TonalJsScaleService } from '@/services/scale-service';
import { HighlightableVexFlowScaleTriadsScoreDrawer, ScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';

export default [
	{ bind: ScaleService, to: TonalJsScaleService },
	{ bind: ScaleTriadsScoreDrawer, to: HighlightableVexFlowScaleTriadsScoreDrawer },
	{ bindName: 'scale.triads.score.element.id', to: 'vexflow-scale-triads-score' },
	{ bindName: 'scale.triads.score.width', to: 765 }
];