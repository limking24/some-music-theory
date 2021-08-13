import Scale from '@/models/scale';
import { expect } from 'chai';

describe('Scale', () => {

	it('create', () => {
		let cIonian = new Scale('Major', 'Ionian', 'C');
		let fHarmonicMinor = new Scale('Minor', 'Harmonic', 'Fb');
		expect(Scale.create('', '', '')).to.deep.equal(cIonian);
		expect(Scale.create('', '', '')).to.deep.equal(cIonian);
		expect(Scale.create('', '-', '')).to.deep.equal(cIonian);
		expect(Scale.create('', '', '-')).to.deep.equal(cIonian);
	});

});