import { Scale as ScaleModel } from '@/models/scale';
import { getScaleInfo, getScaleTriadNames, relativeIonianTonic } from '@/music-theory/scale';
import { expect } from 'chai';

describe('music-theory/scale', () => {

	it(getScaleInfo.name, () => {
		expect(getScaleInfo(new ScaleModel('major', 'ionian', 'c')).name).to.equal('C major');
		expect(getScaleInfo(new ScaleModel('major', 'dorian', 'c')).name).to.equal('C dorian');
		expect(getScaleInfo(new ScaleModel('major', 'phrygian', 'c')).name).to.equal('C phrygian');
		expect(getScaleInfo(new ScaleModel('major', 'lydian', 'c')).name).to.equal('C lydian');
		expect(getScaleInfo(new ScaleModel('major', 'mixolydian', 'c')).name).to.equal('C mixolydian');
		expect(getScaleInfo(new ScaleModel('major', 'aeolian', 'c')).name).to.equal('C aeolian');
		expect(getScaleInfo(new ScaleModel('major', 'locrian', 'c')).name).to.equal('C locrian');
		expect(getScaleInfo(new ScaleModel('minor', 'natural', 'c')).name).to.equal('C aeolian');
		expect(getScaleInfo(new ScaleModel('minor', 'harmonic', 'c')).name).to.equal('C harmonic minor');
		expect(getScaleInfo(new ScaleModel('minor', 'melodic', 'c')).name).to.equal('C melodic minor');
	});

	it(getScaleTriadNames.name, () => {
		expect(getScaleTriadNames(new ScaleModel('major', 'ionian', 'c'))).to.deep.equal(['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']);
		expect(getScaleTriadNames(new ScaleModel('minor', 'natural', 'c'))).to.deep.equal(['Cm', 'Ddim', 'Eb', 'Fm', 'Gm', 'Ab', 'Bb']);
		expect(getScaleTriadNames(new ScaleModel('minor', 'harmonic', 'c'))).to.deep.equal(['Cm', 'Ddim', 'Ebaug', 'Fm', 'G', 'Ab', 'Bdim']);
		expect(getScaleTriadNames(new ScaleModel('minor', 'melodic', 'c'))).to.deep.equal(['Cm', 'Dm', 'Ebaug', 'F', 'G', 'Adim', 'Bdim']);
	});

	it(relativeIonianTonic.name, () => {
		expect(relativeIonianTonic(new ScaleModel('major', 'lydian', 'd'))).to.equal('a');
		expect(relativeIonianTonic(new ScaleModel('minor', 'natural', 'b-flat'))).to.equal('d-flat');
		expect(relativeIonianTonic(new ScaleModel('minor', 'melodic', 'a'))).to.equal('c');
	});

});