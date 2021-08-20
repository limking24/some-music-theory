import { ScaleTriadsScoreDrawer, VexFlowScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';

export default [
	// Scale Triads Score
	{ bind: ScaleTriadsScoreDrawer, to: VexFlowScaleTriadsScoreDrawer },
	{ bindName: 'scale.triads.score.element.id', to: 'vexflow-scale-triads-score' },
	{ bindName: 'scale.triads.score.width', to: 765 }
];