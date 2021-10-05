import { getNotesWithin } from '@/functional/scale';
import { Mode, Scale } from '@tonaljs/tonal';
import { getTonicRangeUpperBound } from './major-minor-scale';
import { ScaleTonic } from './scale-tonic';

export function getStartingPitch(tonic: string): number {
	return ['A', 'B', 'C', 'D'].includes(tonic.charAt(0)) ? 3 : 4;
}

export function getTriadNotes(ref: string, tonic: string): string[] {
	let fromPitch = getStartingPitch(tonic);
	let toPitch = fromPitch + 2;
	return getNotesWithin({ ref, tonic, fromPosition: 5, fromPitch, toPosition: 5, toPitch });
}

export function getTriads(ref: string, tonic: string, subtype: string): string {
	/*
	 * Generate 15 notes in a scale to form 11 triads. Take C Major Ionian as an example,
	 * the following notes will be generated.
	 * 
	 * ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5']
	 * 
	 * Then they will be used to form the following triads.
	 * 
	 * Am:		['A3', 'C4', 'E4']
	 * Bdim:	['B3', 'D4', 'F4']
	 * C:		['C4', 'E4', 'G4']
	 * Dm:		['D4', 'F4', 'A4']
	 * Em:		['E4', 'G4', 'B4']
	 * F:		['F4', 'A4', 'C5']
	 * G:		['G4', 'B4', 'D5']
	 * Am:		['A4', 'C5', 'E5']
	 * Bdim:	['B4', 'D5', 'F5']
	 * C:		['C5', 'E5', 'G5']
	 * Dm:		['D5', 'F5', 'A5']
	 */
	let refNoAccidentals = ['harmonic minor', 'melodic minor'].includes(ref) ? 'minor' : ref;
	let mid = getTonicRangeUpperBound(subtype) + 7;
	let tonicNoAccidentals = ScaleTonic.tonicOfIndex(mid).get();
	let [fromPosition] = [5, 6, 0, 1, 2, 3, 4].slice(tonic.charCodeAt(0) - tonicNoAccidentals.charCodeAt(0));
	let toPosition = fromPosition;
	let fromPitch = getStartingPitch(tonic);
	let toPitch = fromPitch + 2;
	let notes = getNotesWithin({ ref: refNoAccidentals, tonic: tonicNoAccidentals, fromPosition, fromPitch, toPosition, toPitch });
	let triads = [] as [root: string, third: string, fifth: string][];
	for (let i = 0; i < notes.length - 4; i++) {
		triads[i] = [notes[i], notes[i + 2], notes[i + 4]];
	}
	/*
	 * For example:
	 * D Melodic Minor Scale (Index = 10)
	 * 
	 * From:					To:
	 * ['B3' 'D4' 'F4']			['Bn3' 'D4' 'F4']
	 * ['C4' 'E4' 'G4']			['C#4' 'E4' 'G4']
	 * ['D4' 'F4' 'A4']			['D4' 'F4' 'A4']
	 * ['E4' 'G4' 'B4']			['E4' 'G4' 'Bn4']
	 * ['F4' 'A4' 'C5']			['F4' 'A4' 'C#5']
	 * ['G4' 'B4' 'D5']			['G4' 'B4' 'D5']
	 * ['A4' 'C5' 'E5']			['A4' 'C5' 'E5']
	 * ['B4' 'D5' 'F5']			['B4' 'D5' 'F5']
	 * ['C5' 'E5' 'G5']			['C5' 'E5' 'G5']
	 * ['D5' 'F5' 'A5']			['D5' 'F5' 'A5']
	 * ['E5' 'G5' 'B5']			['E5' 'G5' 'Bn5']
	 * 
	 * And then to:
	 * (Bn3 D4 F4)/w, (C#4 E4 G4), (D4 F4 A4), (E4 G4 Bn4), (F4 A4 C#5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5), (E5 G5 Bn5)
	 * 
	 */
	let index = ScaleTonic.indexOfTonic(tonic);
	switch (ref) {
		case 'melodic minor':		addAccidental(triads, [[0, 0], [3, 2], [10, 2]], (index < 11) ? 'n' : (index < 18) ? '#' : '##'); // break omitted intentionally
		case 'harmonic minor':		addAccidental(triads, [[1, 0], [4, 2]], (index < 9) ? 'n' : (index < 16) ? '#' : '##');
	}
	let triadStrings = triads.map(triad => triad.join(' '));
	// e.g. '(A3 C4 E4)/w, (B3 D4 F4), (C4 E4 G4), (D4 F4 A4), (E4 G4 B4), (F4 A4 C5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5)'
	return `(${triadStrings[0]})/w, ${triadStrings.slice(1).map(triad => `(${triad})`).join(', ')}`;
}

function addAccidental(triads: string[][], indices: [number, number][], accidental: string): void {
	indices.forEach(index => {
		let note = triads[index[0]][index[1]];
		triads[index[0]][index[1]] = note.charAt(0) + accidental + note.charAt(1);
	});
}

const TriadSuffixes: Record<string, string[]> = {
	'harmonic minor': ['m', 'dim', 'aug', 'm', '', '', 'dim'],
	'melodic minor': ['m', 'm', 'aug', '', '', 'dim', 'dim']
}

export function getTriadsName(ref: string, tonic: string): string[] {
	let names: string[] = [];
	switch (ref) {
		case 'harmonic minor':
		case 'melodic minor':
			let suffixes = TriadSuffixes[ref];
			let notes = Scale.get(`${tonic} ${ref}`).notes;
			notes[5] = notes[5].replace('##', '𝄪');
			notes[6] = notes[6].replace('##', '𝄪');
			names = notes.map((note, index) => note + suffixes[index]);
			break;
		default:
			names = Mode.triads(ref, tonic);
			break;
	}
	return [...names.slice(5), ...names, ...names.slice(0, 2)];
}

export function getMajorKeySignature(subtype: string, tonic: string): string {
	if (subtype === 'ionian') {
		return tonic;
	}
	let index = ScaleTonic.indexOfTonic(tonic);
	let upper = getTonicRangeUpperBound(subtype);
	let ionianUpper = getTonicRangeUpperBound('ionian');
	return ScaleTonic.tonicOfIndex(index - upper + ionianUpper).get();
}