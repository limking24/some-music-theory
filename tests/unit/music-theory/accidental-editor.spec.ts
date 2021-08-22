import { Scale } from '@/models/scale';
import { AccidentalRemover, HarmonicMinorScaleAccidentalEditor, MelodicMinorScaleAccidentalEditor } from '@/music-theory/accidental-editor';
import { ScaleNoteBuilder } from '@/music-theory/scale-note-builder';
import { expect } from 'chai';

describe('music-theory/scale-note-builder', () => {

	it(AccidentalRemover.name, () => {
		expect(ScaleNoteBuilder
				.of(new Scale('major', 'ionian', 'c-sharp'))
				.fromNotePosition(0)
				.fromPitch(4)
				.toNotePosition(6)
				.toPitch(4)
				.formatter(new AccidentalRemover())
				.create()).to.deep.equal(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']);
	});

	it(HarmonicMinorScaleAccidentalEditor.name, () => {
		expect(ScaleNoteBuilder
			.of(new Scale('minor', 'melodic', 'a-flat'))
			.fromNotePosition(5)
			.fromPitch(3)
			.toNotePosition(6)
			.toPitch(4)
			.formatter(new HarmonicMinorScaleAccidentalEditor())
			.create()).to.deep.equal(['F3', 'Gn3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'Gn4']);

		expect(ScaleNoteBuilder
			.of(new Scale('minor', 'melodic', 'a-sharp'))
			.fromNotePosition(5)
			.fromPitch(3)
			.toNotePosition(6)
			.toPitch(4)
			.formatter(new HarmonicMinorScaleAccidentalEditor())
			.create()).to.deep.equal(['F3', 'G#3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4']);
	});

	it(MelodicMinorScaleAccidentalEditor.name, () => {
		expect(ScaleNoteBuilder
			.of(new Scale('minor', 'melodic', 'e-flat'))
			.fromNotePosition(5)
			.fromPitch(4)
			.toNotePosition(6)
			.toPitch(5)
			.formatter(new MelodicMinorScaleAccidentalEditor())
			.create()).to.deep.equal(['Cn4', 'Dn4', 'E4', 'F4', 'G4', 'A4', 'B4', 'Cn5', 'Dn5']);

		expect(ScaleNoteBuilder
			.of(new Scale('minor', 'melodic', 'e-sharp'))
			.fromNotePosition(5)
			.fromPitch(4)
			.toNotePosition(6)
			.toPitch(5)
			.formatter(new MelodicMinorScaleAccidentalEditor())
			.create()).to.deep.equal(['C#4', 'D#4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C#5', 'D#5']);
	});

});