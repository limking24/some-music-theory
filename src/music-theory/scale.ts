import { Scale as ScaleModel, TonicKey, TonicRangeKeys, TonicRangeStartIndex } from '@/models/scale';
import { Scale as ScaleInfo } from '@tonaljs/scale';
import { Mode, Scale as ScaleUtil } from '@tonaljs/tonal';

export function getScaleInfo(model: ScaleModel): ScaleInfo {
	let args;

	if (ScaleModel.isMinor(model)) {
		args = (model.modeKey === 'natural') ? 
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
		if (model.modeKey === 'natural') {
			return Mode.triads(model.type, model.tonic);
		} else {
			let suffixes = (model.modeKey === 'harmonic') ? TriadSuffixes.HarmonicMinor : TriadSuffixes.MelodicMinor;
			let notes = getScaleInfo(model).notes;
			notes[5] = notes[5].replace('##', '𝄪');
			notes[6] = notes[6].replace('##', '𝄪');
			return notes.map((note, index) => note + suffixes[index]);
		}
	} else {
		let triads = Mode.triads(model.mode, model.tonic);
		// Workaround for tonaljs bug
		if (model.modeKey = 'lydian') {
			triads[3] = getScaleInfo(model).notes[3] + 'dim';
		}
		return triads;
	}
}

/**
 * Given a scale, find the relative tonic in major ionian scale
 * with the same number of flats or sharps in the key signature.
 * 
 * ```
 * Example:
 * D Major Lydian => A Major Ionian (3 sharps)
 * Bb Natural Minor => Db Major Ionian (5 flats)
 * A Melodic Minor => C Major Ionian (0 flat/sharp)
 * ```
 */
export function relativeIonianTonic(scale: ScaleModel): TonicKey {
	if (scale.typeKey === 'major' && scale.modeKey === 'ionian') {
		return scale.tonicKey;
	}
	let index = TonicRangeKeys.indexOf(scale.tonicKey);
	let startIndex = TonicRangeStartIndex[scale.modeKey];
	let relativeIndex = index - startIndex + 1;
	return TonicRangeKeys[relativeIndex];
}