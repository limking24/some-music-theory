import { Scale as ScaleModel } from '@/models/scale';
import { Scale as ScaleInfo } from '@tonaljs/scale';
import { Mode, Scale as ScaleUtil } from '@tonaljs/tonal';

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

const TriadSuffixes = {
	HarmonicMinor: ['m', 'dim', 'aug', 'm', '', '', 'dim'],
	MelodicMinor: ['m', 'm', 'aug', '', '', 'dim', 'dim']
}

export function getScaleTriadNames(model: ScaleModel): string[] {
	if (ScaleModel.isMinor(model)) {
		if (model.mode == 'Natural') {
			return Mode.triads(model.type, model.tonic);
		} else {
			let suffixes = (model.mode == 'Harmonic') ? TriadSuffixes.HarmonicMinor : TriadSuffixes.MelodicMinor;
			return getScaleInfo(model)
					.notes
					.map((note, index) => note + suffixes[index]);
		}
	} else {
		return Mode.triads(model.mode, model.tonic);
	}
}