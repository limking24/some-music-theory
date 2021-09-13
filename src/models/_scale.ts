import { ScaleTonicRange } from './scale-tonic-range';
import { ScaleName } from './_scale-name';

export interface Scale extends ScaleName {
	readonly notesPerOctave: number;
	readonly tonicRange: ScaleTonicRange;
}