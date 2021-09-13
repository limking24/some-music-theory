import { ScaleTonicRange } from './scale-tonic-range';

interface ScaleTypePickerItem {
	readonly key: string;
	readonly display: string;
	readonly aliasKeys: string[];
}

interface ScaleTypePickerItemMap {
	readonly [key: string]: ScaleTypePickerItem;
}

interface MajorMinorScale {
	readonly name: string;
	readonly type: string;
	readonly tonic: string
}


interface Scale {
	tonic: string;
	type: ScaleType;
}

interface ScaleType {
	readonly key: string;
	readonly name: string;
	readonly aliasKeys: string[];
	readonly notesPerOctave: number;
	readonly tonicRange: ScaleTonicRange;
}


/*

MajorMinorScalePicker
	Scale -> Type/Mode -> Tonic

ScaleTypePicker
	Nonatonic/Heptatonic/... -> Name

Scale
	A major scale
	C major scale

Scale Name
	

Scale Type
	Chromatic, or dodecatonic (12 notes per octave)
	Decatonic (10 notes)
	Nonatonic (9 notes per octave): a chromatic variation of the heptatonic blues scale
	Octatonic (8 notes per octave): used in jazz and modern classical music
	Heptatonic (7 notes per octave): the most common modern Western scale
	Hexatonic (6 notes per octave): common in Western folk music
	Pentatonic (5 notes per octave): the anhemitonic form (lacking semitones) is common in folk music, especially in Asian music; also known as the "black note" scale
	Tetratonic (4 notes), tritonic (3 notes), and ditonic (2 notes): generally limited to prehistoric ("primitive") music

 */