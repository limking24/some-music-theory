import { HighlightableVexFlowScaleTriadsScoreDrawer, ScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';
import { DbBasedScaleTypePickerOptionProvider, ScaleTypePickerOptionProvider } from '@/services/scale-type-picker-option-provider';

export default [
	{ bind: ScaleTypePickerOptionProvider, to: DbBasedScaleTypePickerOptionProvider },
	{ bind: ScaleTriadsScoreDrawer, to: HighlightableVexFlowScaleTriadsScoreDrawer },
	{ bindName: 'scale.triads.score.element.id', to: 'vexflow-scale-triads-score' },
	{ bindName: 'scale.triads.score.width', to: 765 }
];