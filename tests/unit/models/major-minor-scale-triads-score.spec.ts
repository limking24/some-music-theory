import { getMajorKeySignature, getTriads, getTriadsName } from '@/models/major-minor-scale-triads-score';
import { expect } from 'chai';

describe('models/major-minor-scale-triads-score', () => {

	it(getTriads.name, () => {
		expect(getTriads('melodic minor', 'D', 'melodic')).to.equal('(Bn3 D4 F4)/w, (C#4 E4 G4), (D4 F4 A4), (E4 G4 Bn4), (F4 A4 C#5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5), (E5 G5 Bn5)');
		expect(getTriads('ionian', 'C', 'ionian')).to.equal('(A3 C4 E4)/w, (B3 D4 F4), (C4 E4 G4), (D4 F4 A4), (E4 G4 B4), (F4 A4 C5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5)');
	});

	it(getTriadsName.name, () => {
		expect(getTriadsName('major', 'C')).to.deep.equal(['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'C', 'Dm']);
		expect(getTriadsName('melodic minor', 'D#')).to.deep.equal(['B#dim', 'C𝄪dim', 'D#m', 'E#m', 'F#aug', 'G#', 'A#', 'B#dim', 'C𝄪dim', 'D#m', 'E#m']);
	});

	it(getMajorKeySignature.name, () => {
		expect(getMajorKeySignature('ionian', 'G')).to.equal('G');
		expect(getMajorKeySignature('melodic', 'A')).to.equal('C');
		expect(getMajorKeySignature('locrian', 'A')).to.equal('Bb');
	});

});