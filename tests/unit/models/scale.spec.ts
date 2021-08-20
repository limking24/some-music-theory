import { Scale } from '@/models/scale';
import { expect } from 'chai';

describe('model/scale', () => {

	describe('static', () => {

		it('create', () => {
			let cIonian = new Scale('major', 'ionian', 'c');
			let dIonian = new Scale('major', 'ionian', 'd');
			let aNaturalMinor = new Scale('minor', 'natural', 'a');
			let bFlatHarmonicMinor = new Scale('minor', 'harmonic', 'b-flat');
	
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '-', '')).to.deep.equal(cIonian);
			expect(Scale.create('', '', '-')).to.deep.equal(cIonian);
	
			expect(Scale.create('', '', 'd')).to.deep.equal(dIonian);
			expect(Scale.create('', '', 'f-flat')).to.deep.equal(cIonian);
			expect(Scale.create('', '', 'z')).to.deep.equal(cIonian);
	
			expect(Scale.create('MAJOR', 'NATURAL', '')).to.deep.equal(cIonian);
			expect(Scale.create('mInOr', 'IoNiAn', '')).to.deep.equal(aNaturalMinor);
	
			expect(Scale.create('minor', '', '')).to.deep.equal(aNaturalMinor);
			expect(Scale.create('', 'natural', '')).to.deep.equal(aNaturalMinor);
			expect(Scale.create('minor', 'natural', '')).to.deep.equal(aNaturalMinor);
			expect(Scale.create('Minor', 'Natural', 'A')).to.deep.equal(aNaturalMinor);
	
			expect(Scale.create('major', '', '')).to.deep.equal(cIonian);
			expect(Scale.create('', 'ionian', '')).to.deep.equal(cIonian);
			expect(Scale.create('major', 'ionian', '')).to.deep.equal(cIonian);
			expect(Scale.create('Major', 'Ionian', 'C')).to.deep.equal(cIonian);
	
			expect(Scale.create('', 'harmonic', 'b-flat')).to.deep.equal(bFlatHarmonicMinor);
			expect(Scale.create('Minor', 'Harmonic', 'B-FLAT')).to.deep.equal(bFlatHarmonicMinor);
		});

	});

});