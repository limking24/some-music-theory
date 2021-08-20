import { Scale } from '@/models/scale';
import ScaleNoteBuilder from '@/music-theory/scale-note-builder';
import { expect } from 'chai';

describe('music-theory/scale-note-builder', () => {

	it('B3 to D5 in C Major Ionian', () => {
		expect(ScaleNoteBuilder
				.of(new Scale('major', 'ionian', 'c'))
				.fromNotePosition(6)
				.fromPitch(3)
				.toNotePosition(1)
				.toPitch(5)
				.create()).to.deep.equal(['B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5']);
	});

});