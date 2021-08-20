import { Scale as ScaleModel } from '@/models/scale';
import { getScaleInfo, getScaleTriadNames } from '@/music-theory/scale';
import { expect } from 'chai';

describe('functional/music-theory', () => {

	it('getScale', () => {
		expect(getScaleInfo(ScaleModel.create('major', 'ionian', 'c')).name).to.equal('C major');
		expect(getScaleInfo(ScaleModel.create('major', 'dorian', 'c')).name).to.equal('C dorian');
		expect(getScaleInfo(ScaleModel.create('major', 'phrygian', 'c')).name).to.equal('C phrygian');
		expect(getScaleInfo(ScaleModel.create('major', 'lydian', 'c')).name).to.equal('C lydian');
		expect(getScaleInfo(ScaleModel.create('major', 'mixolydian', 'c')).name).to.equal('C mixolydian');
		expect(getScaleInfo(ScaleModel.create('major', 'aeolian', 'c')).name).to.equal('C aeolian');
		expect(getScaleInfo(ScaleModel.create('major', 'locrian', 'c')).name).to.equal('C locrian');
		expect(getScaleInfo(ScaleModel.create('minor', 'natural', 'c')).name).to.equal('C aeolian');
		expect(getScaleInfo(ScaleModel.create('minor', 'harmonic', 'c')).name).to.equal('C harmonic minor');
		expect(getScaleInfo(ScaleModel.create('minor', 'melodic', 'c')).name).to.equal('C melodic minor');
	});

	it('getScaleTriadNames', () => {
		expect(getScaleTriadNames(ScaleModel.create('major', 'ionian', 'c'))).to.deep.equal(['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']);
		expect(getScaleTriadNames(ScaleModel.create('minor', 'natural', 'c'))).to.deep.equal(['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb']);
		expect(getScaleTriadNames(ScaleModel.create('minor', 'harmonic', 'c'))).to.deep.equal(['Cm', 'Ddim', 'Ebaug', 'Fm', 'G', 'Ab', 'Bdim']);
		expect(getScaleTriadNames(ScaleModel.create('minor', 'melodic', 'c'))).to.deep.equal(['Cm', 'Dm', 'Ebaug', 'F', 'G', 'Adim', 'Bdim']);
	});

});