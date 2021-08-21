import { Scale } from '@/models/scale';
import { Inject, Singleton } from 'typescript-ioc';
import { indicateAsNatural, removeAccidental, indicateAsSharp } from './note';
import { NoteFormatter, NotePosition } from './scale-note-builder';

/**
 * Removes accidentals from notes as it will be shown in the key signature.
 */
@Singleton
export class AccidentalRemover implements NoteFormatter {

	public format(note: string | undefined, position: NotePosition): string | undefined {
		if (note === undefined)
			return;
		
		return removeAccidental(note);
	}
	
}

/**
 * Removes accidentals from notes as it will be shown in the key signature, except
 * for the seventh note. Since it is raised by half a step, natural accidental will
 * be added to it if it has no accidental. If it has a sharp or a double sharp
 * accidental, it will become/remain as sharp.
 */
@Singleton
export class HarmonicMinorScaleAccidentalEditor implements NoteFormatter {

	public format(note: string | undefined, position: NotePosition): string | undefined {
		if (note === undefined)
			return;
			
			switch(position) {
				case 6:
					return editNoteRaisedByHalfStep(note);
				default:
					return removeAccidental(note);
			}
	}
	
}

/**
 * Removes accidentals from notes as it will be shown in the key signature, except
 * for the sixth and seventh notes. Since they are raised by half a step, natural 
 * accidental will be added to them if they have no accidental. If they have a 
 * sharp or a double sharp accidental, it will become/remain as sharp.
 */
@Singleton
export class MelodicMinorScaleAccidentalEditor implements NoteFormatter {

	public format(note: string | undefined, position: NotePosition): string | undefined {
		if (note === undefined)
			return;
		
		switch(position) {
			case 5:
			case 6:
				return editNoteRaisedByHalfStep(note);
			default:
				return removeAccidental(note);
		}
	}
	
}

@Singleton
export class AccidentalEditorProvider {

	public constructor(@Inject private accidentalRemover: AccidentalRemover,
						@Inject private harmonicMinorEditor: HarmonicMinorScaleAccidentalEditor,
						@Inject private melodicMinorEditor: MelodicMinorScaleAccidentalEditor) {}

	public get(scale: Scale): NoteFormatter {
		switch (scale.modeKey) {
			case 'harmonic':
				return this.harmonicMinorEditor;
			case 'melodic':
				return this.melodicMinorEditor;
			default:
				return this.accidentalRemover;
		}
	}
}

function editNoteRaisedByHalfStep(note: string): string {
	if (note.charAt(2) === '#') {
		return indicateAsSharp(note); // Change from double sharp to sharp
	} else if (note.charAt(1) === '#') {
		return note; // Sharp remains as sharp
	} else {
		return indicateAsNatural(note); // Natural remains as natural but add accidental
	}
}