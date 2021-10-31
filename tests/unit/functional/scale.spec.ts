import { asDemonstration, getNotesWithin } from '@/functional/scale';
import { expect } from 'chai';

describe('functional/scale', () => {

	it(getNotesWithin.name, () => {
		expect(getNotesWithin({
			ref: 'major',
			tonic: 'C',
			fromPosition: 0,
			fromPitch: 4,
			toPosition: 2,
			toPitch: 5
		})).to.deep.equal(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']);
	});

	it(asDemonstration.name, () => {
		expect(asDemonstration(['C', 'D', 'E', 'F', 'G', 'A', 'B'])).to.deep.equal(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']);
		expect(asDemonstration(['A', 'B', 'C', 'D', 'E', 'F', 'G'])).to.deep.equal(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4']);
	});

});