import { MajorMinorScaleOption } from '@/models/major-minor-scale-option';
import { expect } from 'chai';

function match(option: MajorMinorScaleOption, scale: string, type: string, tonic: string): boolean {
	return (option.selectedScale === scale) &&
			(option.selectedType === type) && 
			(option.selectedTonic === tonic);
}

describe('model/major-minor-scale-option', () => {

	describe('constructor', () => {

		it('Valid arguments', () => {
			expect(match(new MajorMinorScaleOption('major', 'ionian', 'c'),			'major', 'ionian', 'c')).to.be.true;
			expect(match(new MajorMinorScaleOption('MAJOR', 'LOCRIAN', 'B'),		'major', 'locrian', 'b')).to.be.true;
			expect(match(new MajorMinorScaleOption('minor', 'natural', 'a'),		'minor', 'natural', 'a')).to.be.true;
			expect(match(new MajorMinorScaleOption('MINOR', 'MELODIC', 'D-SHARP'),	'minor', 'melodic', 'd-sharp')).to.be.true;
		});

		it('Invalid scale', () => {
			expect(match(new MajorMinorScaleOption('123', 'ionian', 'f'),			'major', 'ionian', 'f')).to.be.true;
			expect(match(new MajorMinorScaleOption('123', 'natural', 'a'),			'major', 'ionian', 'a')).to.be.true;
		});

		it('Invalid type', () => {
			expect(match(new MajorMinorScaleOption('major', '123', 'c'),			'major', 'ionian', 'c')).to.be.true;
			expect(match(new MajorMinorScaleOption('minor', '123', 'a'),			'minor', 'natural', 'a')).to.be.true;
		});

		it('Invalid tonic', () => {
			expect(match(new MajorMinorScaleOption('Major', 'Lydian', 'C-Sharp'),	'major', 'lydian', 'f')).to.be.true;
			expect(match(new MajorMinorScaleOption('MINOR', 'HARMONIC', 'D-FLAT'),	'minor', 'harmonic', 'a')).to.be.true;
		});

	});

	let instance = new MajorMinorScaleOption('minor', 'harmonic', 'e');

	describe('set selectedScale', () => {

		it('Valid scale', () => {
			instance.selectedScale = 'major';
			expect(match(instance, 'major', 'ionian', 'g'));
			instance.selectedScale = 'minor';
			expect(match(instance, 'minor', 'natural', 'e'));
		});

		it('Invalid scale', () => {
			instance.selectedScale = '123';
			expect(match(instance, 'major', 'ionian', 'g'));
		});

	});

	describe('set selectType', () => {

		it('Valid type', () => {
			instance.selectedType = 'DORIAN';
			expect(match(instance, 'major', 'dorian', 'a'));
			instance.selectedScale = 'MINOR';
			instance.selectedType = 'MELODIC';
			expect(match(instance, 'minor', 'melodic', 'b'));
		});

		it('Invalid type', () => {
			instance.selectedType = '123';
			expect(match(instance, 'minor', 'natural', 'e'));
			instance.selectedScale = 'major';
			instance.selectedType = 'melodic';
			expect(match(instance, 'major', 'ionian', 'g'));
		});

	});

	describe('set selectTonic', () => {

		it('Valid tonic', () => {
			instance.selectedTonic = 'c';
			expect(match(instance, 'major', 'ionian', 'c'));
			instance.selectedScale = 'MINOR';
			instance.selectedTonic = 'A-SHARP';
			expect(match(instance, 'minor', 'natural', 'a-sharp'));
		});

		it('Invalid tonic', () => {
			instance.selectedTonic = 'e-sharp';
			expect(match(instance, 'minor', 'natural', 'a'));
			instance.selectedScale = 'major';
			instance.selectedTonic = 'f-flat';
			expect(match(instance, 'major', 'ionian', 'c'));
		});

	});

});