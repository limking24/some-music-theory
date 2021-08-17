import { default as ScaleModel } from '@/models/scale';
import { Scale as ScaleInfo } from '@tonaljs/scale';
import { Scale as ScaleUtil } from '@tonaljs/tonal';

export function getScaleInfo(model: ScaleModel): ScaleInfo {
	let args;

	if (ScaleModel.isMinor(model)) {
		args = (model.mode == 'Natural') ? 
				`${model.tonic} ${model.type}` :
				`${model.tonic} ${model.mode} ${model.type}`
	} else {
		args = `${model.tonic} ${model.mode}`;
	}

	return ScaleUtil.get(args.toLowerCase());
}