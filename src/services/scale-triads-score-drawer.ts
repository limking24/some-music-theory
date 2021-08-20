import { Scale, TonicRange } from '@/models/scale';
import { removeAccidental } from '@/music-theory/note';
import { getScaleTriadNames, relativeIonianTonic } from '@/music-theory/scale';
import ScaleNoteBuilder from '@/music-theory/scale-note-builder';
import { InjectValue, Singleton } from 'typescript-ioc';
import Vex from 'vexflow';

export abstract class ScaleTriadsScoreDrawer {

	abstract draw(scale: Scale): void;

	abstract reset(): void;

}

@Singleton
export class VexFlowScaleTriadsScoreDrawer extends ScaleTriadsScoreDrawer {

	public constructor(@InjectValue('scale.triads.score.element.id') private elementId: string,
						@InjectValue('scale.triads.score.width') private width: number) {
		super();
	}

	draw(scale: Scale): void {
		let startPitch = ['a', 'b', 'c', 'd'].includes(scale.tonicKey.charAt(0)) ? 3 : 4;
		let notes = ScaleNoteBuilder
						.of(scale)
						.fromNotePosition(5)
						.fromPitch(startPitch)
						.toNotePosition(5)
						.toPitch(startPitch + 2)
						.create()
						.map(removeAccidental);
		let triads = [];
		for (let i = 0; i < notes.length - 4; i++) {
			triads.push(`${notes[i]} ${notes[i + 2]} ${notes[i + 4]}`);
		}

		// e.g. '(A3 C4 E4)/w, (B3 D4 F4), (C4 E4 G4), (D4 F4 A4), (E4 G4 B4), (F4 A4 C5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5)'
		let triadsString = `(${triads[0]})/w, ${triads.slice(1).map(triad => `(${triad})`).join(', ')}`;
		let chordNames = getScaleTriadNames(scale);
		// e.g. ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'C', 'Dm']
		chordNames = [...chordNames.slice(5), ...chordNames, ...chordNames.slice(0, 2)];

		let vf = new Vex.Flow.Factory({renderer: {elementId: this.elementId, width: this.width}});
		let score = vf.EasyScore();
		let system = vf.System({width: this.width - 15});
		let chordTextNotes = chordNames.map(chord => new Vex.Flow.TextNote({text: chord, duration: 'w'})
															.setJustification(Vex.Flow.TextNote.Justification.CENTER)
															.setLine(12));
		system
			.addStave({voices: [
				score.voice(score.notes(triadsString), {time: '11/1'}),
				score.voice(chordTextNotes, {time: '11/1'})
			]})
			.addClef('treble')
			.addKeySignature(TonicRange[relativeIonianTonic(scale)]);
		vf.draw();
	}

	reset(): void {
		let score = document.getElementById(this.elementId);
		if (score != undefined) {
			while (score.hasChildNodes()) {
				score.removeChild(score.lastChild!);
			}
		}
	}

}