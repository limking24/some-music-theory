import { TonalScaleNameFactory } from '@/middleware/tonal-scale-name-factory';
import { ScaleNameDictionary } from '@/services/scale-name-dictionary';
import { ScaleNameProvider, TonalScaleNameProvider } from '@/services/scale-name-provider';
import { HighlightableVexFlowScaleTriadsScoreDrawer, ScaleTriadsScoreDrawer } from '@/services/scale-triads-score-drawer';
import { Container, ObjectFactory } from 'typescript-ioc';

let scaleNameDictionary: ScaleNameDictionary | undefined;
let scaleNameDictionaryProvider: ObjectFactory = () => {
	if (scaleNameDictionary === undefined) {
		let factory = Container.get(TonalScaleNameFactory);
		scaleNameDictionary = new ScaleNameDictionary();
		factory.all().forEach(name => scaleNameDictionary!.add(name));
	}
	return scaleNameDictionary;
};

export default [
	{ bind: ScaleNameProvider, to: TonalScaleNameProvider },
	{ bind: ScaleNameDictionary, factory: scaleNameDictionaryProvider },
	// Scale Triads Score
	{ bind: ScaleTriadsScoreDrawer, to: HighlightableVexFlowScaleTriadsScoreDrawer },
	{ bindName: 'scale.triads.score.element.id', to: 'vexflow-scale-triads-score' },
	{ bindName: 'scale.triads.score.width', to: 765 }
];