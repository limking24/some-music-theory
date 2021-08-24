import { Scale, TonicRange } from '@/models/scale';
import { AccidentalEditorProvider } from '@/music-theory/accidental-editor';
import { getScaleTriadNames, relativeIonianTonic } from '@/music-theory/scale';
import { ScaleNoteBuilder } from '@/music-theory/scale-note-builder';
import { Inject, InjectValue, Singleton } from 'typescript-ioc';
import Vex from 'vexflow';

export abstract class ScaleTriadsScoreDrawer {

	abstract draw(scale: Scale): void;

	abstract reset(): void;

}

export class VexFlowScaleTriadsScoreDrawer extends ScaleTriadsScoreDrawer {

	public constructor(protected elementId: string,
						protected width: number,
						protected accidentalEditorProvider: AccidentalEditorProvider) {
		super();
	}

	public draw(scale: Scale): void {
		let startPitch = ['a', 'b', 'c', 'd'].includes(scale.tonicKey.charAt(0)) ? 3 : 4;
		let notes = ScaleNoteBuilder
						.of(scale)
						.fromNotePosition(5)
						.fromPitch(startPitch)
						.toNotePosition(5)
						.toPitch(startPitch + 2)
						.formatter(this.accidentalEditorProvider.get(scale))
						.create();
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
															.setLine((startPitch === 3) ? 13 : 11));
		system
			.addStave({voices: [
				score.voice(score.notes(triadsString), {time: '11/1'}),
				score.voice(chordTextNotes, {time: '11/1'})
			]})
			.addClef('treble')
			.addKeySignature(TonicRange[relativeIonianTonic(scale)]);
		vf.draw();
	}

	public reset(): void {
		let score = document.getElementById(this.elementId);
		if (score != undefined) {
			while (score.hasChildNodes()) {
				score.removeChild(score.lastChild!);
			}
		}
	}

}

@Singleton
export class HighlightableVexFlowScaleTriadsScoreDrawer extends VexFlowScaleTriadsScoreDrawer {

	public constructor(@InjectValue('scale.triads.score.element.id') elementId: string,
						@InjectValue('scale.triads.score.width') width: number,
						@Inject accidentalEditorProvider: AccidentalEditorProvider) {
		super(elementId, width, accidentalEditorProvider);
	}

	public draw(scale: Scale): void {
		super.draw(scale);
		document
			.querySelectorAll(`#${this.elementId} g.vf-notehead`)
			.forEach((element, x) => {
				/*
				x:			2  5  8  11 14 17 20 23 26 29 32
							1  4  7  10 13 16 19 22 25 28 31
							0  3  6  9  12 15 18 21 24 27 30

				noteIndex:	4  5  6  0  1  2  3  4  5  6  0
							2  3  4  5  6  0  1  2  3  4  5
							0  1  2  3  4  5  6  0  1  2  3
				*/
				let y = x % 3;
				let noteIndex = ((x - y) / 3 + (y * 2)) % 7;
				let clazz = `_${noteIndex}`
				let selector = `#${this.elementId} g.vf-notehead.${clazz}`;
				element.classList.add(clazz);
				element.addEventListener('mouseover', () => document
																.querySelectorAll(selector)
																.forEach(element => element.classList.add('active')));
				element.addEventListener('mouseout', () => document
																.querySelectorAll(selector)
																.forEach(element => element.classList.remove('active')));
			});
	}

}