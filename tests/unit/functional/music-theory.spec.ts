import { expect } from 'chai';
import { default as ScaleModel } from '@/models/scale';
import { getScaleInfo, getScaleTriadNames } from '@/functional/music-theory';

describe('functional/music-theory', () => {

	it('getScale', () => {
		expect(getScaleInfo(ScaleModel.create('Major', 'Ionian', 'C')).name).to.equal('C major');
		expect(getScaleInfo(ScaleModel.create('Major', 'Dorian', 'C')).name).to.equal('C dorian');
		expect(getScaleInfo(ScaleModel.create('Major', 'Phrygian', 'C')).name).to.equal('C phrygian');
		expect(getScaleInfo(ScaleModel.create('Major', 'Lydian', 'C')).name).to.equal('C lydian');
		expect(getScaleInfo(ScaleModel.create('Major', 'Mixolydian', 'C')).name).to.equal('C mixolydian');
		expect(getScaleInfo(ScaleModel.create('Major', 'Aeolian', 'C')).name).to.equal('C aeolian');
		expect(getScaleInfo(ScaleModel.create('Major', 'Locrian', 'C')).name).to.equal('C locrian');
		expect(getScaleInfo(ScaleModel.create('Minor', 'Natural', 'C')).name).to.equal('C aeolian');
		expect(getScaleInfo(ScaleModel.create('Minor', 'Harmonic', 'C')).name).to.equal('C harmonic minor');
		expect(getScaleInfo(ScaleModel.create('Minor', 'Melodic', 'C')).name).to.equal('C melodic minor');
	});

	it('getScaleTriadNames', () => {
		expect(getScaleTriadNames(ScaleModel.create('Major', 'Ionian', 'C'))).to.deep.equal(['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']);
		expect(getScaleTriadNames(ScaleModel.create('Minor', 'Natural', 'C'))).to.deep.equal(['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb']);
		expect(getScaleTriadNames(ScaleModel.create('Minor', 'Harmonic', 'C'))).to.deep.equal(['Cm', 'Ddim', 'Ebaug', 'Fm', 'G', 'Ab', 'Bdim']);
		expect(getScaleTriadNames(ScaleModel.create('Minor', 'Melodic', 'C'))).to.deep.equal(['Cm', 'Dm', 'Ebaug', 'F', 'G', 'Adim', 'Bdim']);
	});

});