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

let scaleInfo = ScaleUtil.get('C Ionian');
let firstTonicPitch = [65, 66, 97, 98].includes(scaleInfo.name.charCodeAt(0)) ? 3 : 4; // A/B = 3, C/D/E/F/G = 4

/**
 * Example: 
 * ```
 * let scaleInfo = ScaleModel.create('Major', 'Ionian', 'C');
 * let firstTonicPitch = 4;
 * let lowerBoundOffset = 2;
 * let length = 8;
 * rangeOf(scaleInfo, firstTonicPitch, lowerBoundOffset, length);
 * 
 *       firstTonicPitch
 *              v
 *   A3   B3   C4   D4   E4   F4   G4   A4
 * |_________|
 *      |
 * lowerBoundOffset
 * |______________________________________|
 *                     |
 *                  length
 * 
 * ```
 * @param scaleInfo 
 * @param firstTonicPitch 
 * @param lowerBoundOffset 
 * @param length 
 */
function rangeOf(scaleInfo: ScaleInfo, firstTonicPitch: number, lowerBoundOffset: number, length: number) {
	/*
		ScaleNotes
			.of(cMajor)
			.firstTonicPitch(4)
			.lowerBoundOffset(2) // less than 7
			.numberOfNotes(8)
			.create()
	*/
}