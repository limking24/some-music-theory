import Scale from '@/models/scale';
import { InjectValue, Singleton } from 'typescript-ioc';
import Vex from 'vexflow';

export abstract class ScaleTriadsScoreDrawer {

	abstract draw(scale: Scale): void;

	abstract reset(): void;

}

@Singleton
export class VexFlowScaleTriadsScoreDrawer extends ScaleTriadsScoreDrawer {

	public constructor(@InjectValue('scale.triads.score.element.id') private elementId: string) {
		super();
	}

	draw(scale: Scale): void {
		let triads = '(A3 C4 E4)/w, (B3 D4 F4), (C4 E4 G4), (D4 F4 A4), (E4 G4 B4), (F4 A4 C5), (G4 B4 D5), (A4 C5 E5), (B4 D5 F5), (C5 E5 G5), (D5 F5 A5)';
		let vf = new Vex.Flow.Factory({renderer: {elementId: this.elementId, width: 715}});
		
		let score = vf.EasyScore();
		let system = vf.System({width: 700});
		
		let chordNames = [
			new Vex.Flow.TextNote({text: 'Am', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Bdim', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'C', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'D', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Em', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'F', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'G', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Am', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'Bdim', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'C', duration: 'w'}),
			new Vex.Flow.TextNote({text: 'D', duration: 'w'}),
		];

		chordNames.forEach(name => name
									.setJustification(Vex.Flow.TextNote.Justification.CENTER)
									.setLine(12));

		let voices = [
			score.voice(score.notes(triads), {time: '11/1'}),
			score.voice(chordNames, {time: '11/1'})
		];

		system
			.addStave({
				voices,
				options: {
					x_shift: 10
				}
			})
			.addClef('treble')
			.addKeySignature('C');

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