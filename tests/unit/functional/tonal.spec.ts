import { expect } from 'chai';
import { default as ScaleModel } from '@/models/scale';
import { getScale } from '@/functional/tonal';

describe('Tonaljs', () => {

	it('getScale', () => {
		expect(getScale(ScaleModel.create('Major', 'Ionian', 'C')).name).to.equal('C major');
		expect(getScale(ScaleModel.create('Major', 'Dorian', 'C')).name).to.equal('C dorian');
		expect(getScale(ScaleModel.create('Major', 'Phrygian', 'C')).name).to.equal('C phrygian');
		expect(getScale(ScaleModel.create('Major', 'Lydian', 'C')).name).to.equal('C lydian');
		expect(getScale(ScaleModel.create('Major', 'Mixolydian', 'C')).name).to.equal('C mixolydian');
		expect(getScale(ScaleModel.create('Major', 'Aeolian', 'C')).name).to.equal('C aeolian');
		expect(getScale(ScaleModel.create('Major', 'Locrian', 'C')).name).to.equal('C locrian');
		expect(getScale(ScaleModel.create('Minor', 'Natural', 'C')).name).to.equal('C aeolian');
		expect(getScale(ScaleModel.create('Minor', 'Harmonic', 'C')).name).to.equal('C harmonic minor');
		expect(getScale(ScaleModel.create('Minor', 'Melodic', 'C')).name).to.equal('C melodic minor');
	});

});