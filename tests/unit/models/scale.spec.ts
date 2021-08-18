import Scale from '@/models/scale';
import { expect } from 'chai';

describe('model/scale', () => {

	describe('static', () => {

		it('create', () => {
			let cIonian = new Scale('Major', 'Ionian', 'C');
			let dIonian = new Scale('Major', 'Ionian', 'D');
			let cNaturalMinor = new Scale('Minor', 'Natural', 'C');
			let gFlatHarmonicMinor = new Scale('Minor', 'Harmonic', 'Gb');
	
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '-', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '-')).to.deep.equal(cIonian);
	
			expect(Scale.create('', '', 'd')).to.deep.equal(dIonian);
			expect(Scale.create('', '', 'fb')).to.deep.equal(cIonian);
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
	
			expect(Scale.create('', 'harmonic', 'gb')).to.deep.equal(gFlatHarmonicMinor);
			expect(Scale.create('Minor', 'Harmonic', 'Gb')).to.deep.equal(gFlatHarmonicMinor);
		});

	});

});