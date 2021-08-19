import Scale from '@/models/scale';
import { expect } from 'chai';

describe('model/scale', () => {

	describe('static', () => {

		it('create', () => {
			let cIonian = new Scale('major', 'ionian', 'c');
			let dIonian = new Scale('major', 'ionian', 'd');
			let cNaturalMinor = new Scale('minor', 'natural', 'c');
			let gFlatHarmonicMinor = new Scale('minor', 'harmonic', 'g-flat');
	
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '-', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '-')).to.deep.equal(cIonian);
	
			expect(Scale.create('', '', 'd')).to.deep.equal(dIonian);
			expect(Scale.create('', '', 'f-flat')).to.deep.equal(cIonian);
			expect(Scale.create('', '', 'z')).to.deep.equal(cIonian);
	
			expect(Scale.create('MAJOR', 'NATURAL', '')).to.deep.equal(cIonian);
			expect(Scale.create('mInOr', 'IoNiAn', '')).to.deep.equal(cNaturalMinor);
	
			expect(Scale.create('minor', '', '')).to.deep.equal(cNaturalMinor);
			expect(Scale.create('', 'natural', '')).to.deep.equal(cNaturalMinor);
			expect(Scale.create('minor', 'natural', '')).to.deep.equal(cNaturalMinor);
			expect(Scale.create('Minor', 'Natural', 'C')).to.deep.equal(cNaturalMinor);
	
			expect(Scale.create('major', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', 'ionian', '')).to.deep.equal(cIonian);
			expect(Scale.create('major', 'ionian', '')).to.deep.equal(cIonian);
			expect(Scale.create('Major', 'Ionian', 'C')).to.deep.equal(cIonian);
	
			expect(Scale.create('', 'harmonic', 'g-flat')).to.deep.equal(gFlatHarmonicMinor);
			expect(Scale.create('Minor', 'Harmonic', 'G-FLAT')).to.deep.equal(gFlatHarmonicMinor);
		});

	});

});